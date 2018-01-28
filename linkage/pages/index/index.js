//index.js
//获取应用实例
var param={
  data:{
    orientationList:[
      { id: "01", region: "东北" },
      { id: "02", region: "华北" },
      { id: "03", region: "华东" },
      // { id: "04", region: "华南" },
      // { id: "05", region: "华中" },
      // { id: "06", region: "西北" },
      // { id: "07", region: "西南" },
    ],
    act_addList:[
      {
        id:"01",region:"东北地区",
        city:[
          { id: "0101", name: "白山江源" },
          { id: "0102", name: "白山市" },
          { id: "0103", name: "宾县" },
          { id: "0104", name: "大庆" },
          { id: "0105", name: "大庆" },
          { id: "0106", name: "大庆" },
          { id: "0107", name: "大庆" },
          { id: "0108", name: "大庆" },
          { id: "0109", name: "大庆" },
          { id: "0110", name: "大庆" },
        ]
      },
      {
        id: "02", region: "华北地区",
        city: [
          { id: "0201", name: "白山江源" },
          { id: "0202", name: "白山市" },
          { id: "0203", name: "宾县" },
          { id: "0204", name: "大庆" },
          { id: "0205", name: "大庆" },
          { id: "0206", name: "大庆" },
          { id: "0207", name: "大庆" },
          { id: "0208", name: "大庆" },
          { id: "0209", name: "大庆" },
          { id: "0210", name: "大庆" },
        ]
      },
      {
        id: "03", region: "华东地区",
        city: [
          { id: "0301", name: "白山江源" },
          { id: "0302", name: "白山市" },
          { id: "0303", name: "宾县" },
          { id: "0304", name: "大庆" },
          { id: "0305", name: "大庆" },
          { id: "0306", name: "大庆" },
          { id: "0307", name: "大庆" },
          { id: "0308", name: "大庆" },
          { id: "0309", name: "大庆" },
          { id: "0310", name: "大庆" },
        ]
      },
    ]
  },
  right_fl(e){//右边点击事件
    this.setData({
      classifySelected: e.target.dataset.id,
      viewid: e.target.dataset.id
    });

  },
  gdcf(e){//滚动出发
   var scrollTop = e.detail.scrollTop * (750/e.detail.scrollWidth);
    var h=0;
    var classifySelected;
    this.data.position.forEach(function(v,i,o){
      if (scrollTop >= v.topX){
       classifySelected=v.id;
      }
    });
    this.setData({ classifySelected });
  },
  //计算当前大分类下的小分类数量
  cityLength(id){
    var act_addList = this.data.act_addList;
    for (var i = 0; i < act_addList.length;i++){
      if (act_addList[i].id==id){
        return act_addList[i].city.length;
      }
    }
    return 0;
  },
  onLoad:function(){
    // this.setData({
    //   viewid: this.data.orientationList[0].id,
    //   classifySelected: this.data.orientationList[0].id
    // })
  },
  onReady:function(){
    var position=[],h=0;
    this.data.orientationList.forEach(function (v, i, o) {
      position.push({ id: v.id,topX:h});
      h += 76 + this.cityLength(v.id) * 88;
    }.bind(this));
    this.setData({
      position: position,
      viewid: this.data.orientationList[0].id,
      classifySelected: this.data.orientationList[0].id
    })
  }
}
Page(param);
