var React = require('react');
var renderMap = require('./render');
var d3ify = require('./d3ify');
var d3 = require('d3');
require('d3-tip');
var tooltipView = require('./tooltip-view');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      updateable: false,
      force: null,
      init: false,
      listening: false
    };
  },

  render: function () {
    return  <svg
              id={this.props.id}
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid meet"
              viewBox={"0 0 " + this.props.width + " " + this.props.height} >
              <g id="zoom">
                <g id="mapG">
                  <rect
                    className="overlay"
                    width={this.props.width}
                    height={this.props.height} >
                  </rect>
                </g>
              </g>
            </svg>;
  },

  componentDidMount: function () {
    console.log('map rendering', this.props);
    var data = this.props.data;
    var nodeObj = data.nodeObj;

    if (Object.keys(nodeObj).length > 0) {
     var options = {
        selector: this.props.selector,
        width: this.props.width,
        height: this.props.height
      };
      renderMap(d3ify(nodeObj), options, this);
      this.setState({ init: true })
    }
  },

  registerForceListeners: function () {
    this.state.force.on('end', function () {
      this.setState({ updateable: true });
    }.bind(this));

    this.state.force.on('start', function () {
      this.setState({ updateable: false });
    }.bind(this));

    this.setState({ listening: true });
  }

})