import React, { Component } from 'react';
import API from "./utils/API";
import './App.css';
import { Select, Card } from 'antd';
const { Option } = Select;
const { Meta } = Card;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breeds: [],
      curBreed: "",
      dogImg: "",

      subBreeds: [],
      curSubBreed: "",
      subImg: ""
    };
  }

  componentDidMount() {
    this.getDogBreeds();
  }

  //get dog's breeds 
  async getDogBreeds() {
    let data = await API("breeds/list/all", {}, { method: "get" });
    if (data && data.message) {
      let breeds = [];
      for (let key in data.message) {
        breeds.push(key);
      }
      this.setState({
        breeds: breeds
      })
    }
  }

  //get dog's subBreeds 
  async getSubDogBreeds() {
    if (this.state.curBreed) {
      let data = await API("breed/" + this.state.curBreed + "/list/", {}, { method: "get" });
      if (data && data.message) {
        this.setState({
          subBreeds: data.message
        });
      }
    }
  }

  render() {
    let options = this.state.breeds.map((e, i) => {
      return <Option key={e} value={e}>{e}</Option>
    });
    let subOptions = this.state.subBreeds.map((e, i) => {
      return <Option key={e} value={e}>{e}</Option>
    });
    return (
      <div className="App">
        <div className="container">
          <div className="area">
            <Select
              style={{ width: 200 }}
              placeholder="Select a breed"
              optionFilterProp="children"
              onChange={(value) => { this.onBreedChange(value); }}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {options}
            </Select>
            {this.state.dogImg &&
              <Card
                hoverable
                style={{ width: 240, marginTop: 30 }}
                cover={<img alt="example" src={this.state.dogImg} />}
              >
                <Meta title={this.state.curBreed} />
              </Card>}
          </div>

          <div className="area">
            <Select
              style={{ width: 200 }}
              placeholder="Select a subBreed"
              optionFilterProp="children"
              onChange={(value) => { this.onSubBreedChange(value); }}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {subOptions}
            </Select>
            {this.state.subImg &&
              <Card
                hoverable
                style={{ width: 240, marginTop: 30 }}
                cover={<img alt="example" src={this.state.subImg} />}
              >
                <Meta title={this.state.curSubBreed} />
              </Card>}
          </div>
        </div>
      </div>
    );
  }

  //breed change , callback
  onBreedChange(value) {
    console.log(value);
    if (value !== this.state.curBreed) {
      this.setState({
        curBreed: value
      }, () => {
        this.getBreedImageUrl();
        this.getSubDogBreeds();
      })
    }
  }

  //subBreed change , callback
  onSubBreedChange(value) {
    console.log(value);
    if (value !== this.state.curSubBreed) {
      this.setState({
        curSubBreed: value
      }, () => {
        this.getSubBreeadImageUrl();
      })
    }
  }

  //load image url
  async getBreedImageUrl() {
    let data = await API("breed/" + this.state.curBreed + "/images/random", {}, { method: "get" });
    if (data && data.message) {
      this.setState({
        dogImg: data.message
      })
    }
  }

  //load subBreed image url
  async getSubBreeadImageUrl() {
    let data = await API("breed/" + this.state.curBreed + "/" + this.state.curSubBreed + "/images/random", {}, { method: "get" });
    console.log("////////", data);
    if (data && data.message) {
      this.setState({
        subImg: data.message
      })
    }
  }
}

export default App;