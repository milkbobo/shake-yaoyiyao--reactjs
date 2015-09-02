define('mobile/common/shake/WinList.jsx', function(require, exports, module){ var React = require('fishstrap/react/react-debug.js');
var $ = require('mobile/common/core/core.js');
var IScroll = require('fishstrap/module/iscroll.js');

module.exports = React.createClass({displayName: "exports",

  getInitialState: function() {
    return {
      list:'',
      winList: '',
    };

  },

   componentDidMount : function() {
 
    $.post('/luckydraw/winningList', {
      luckyDrawId:this.props.luckyDrawId
    }, function(data) {
      if (data.code != 0) {
        console.log(data.msg);
        return;
      }

      this.setState({winList: data.data});
      this.listData();
      window.myscroll = new IScroll(React.findDOMNode(this.refs.winContent));
    }.bind(this));

   },

   listData:function(){

    var winList = this.state.winList;

    if(!Array.isArray(winList)) throw new Error ('中奖名单winsList必须是数组');

    var list = winList.map(function(listArray){
      return React.createElement("li", {key: _.uniqueId()}, listArray.nickName, "一一[", listArray.title, "]")
    });

     this.setState({list: list});

   },

   winningResults:function(){
    if(this.props.errorNum == 0){
      return React.createElement("div", null, React.createElement("p", null, "您已获得:"), React.createElement("p", {className: "prizeText"}, this.props.rotateFinishTip))
    }else{
      return React.createElement("div", null, React.createElement("p", null, "您已参与本次抽奖活动"), React.createElement("p", null, "只限一次哦!"))
    }
   },

  render:function(){

    var ListStyle = {
      zIndex:this.props.WinListDisplay ? '5' : '-5',
    }

    return (

  React.createElement("div", {style: ListStyle, className: "txtMarquee-left"}, 

    React.createElement("div", {className: "bd"}, 
    React.createElement("div", {className: "clock", onClick: this.props.WinListClock}, React.createElement("p", null, "╳")), 
    React.createElement("div", {className: "row"}, 
      React.createElement("div", {ref: "winContent", id: "wrapper"}, 
          React.createElement("ul", {id: "scroll"}, 

          this.state.list, 

          React.createElement("li", null, "………")
          )
        )
    ), 
      React.createElement("div", {className: "prize"}, 

        this.winningResults(), 

        React.createElement("a", {href: "luckylist.html"}, React.createElement("div", {className: "zzzx"}, "查看奖品"))
      )
  )
  )

    )
  },

});
 });