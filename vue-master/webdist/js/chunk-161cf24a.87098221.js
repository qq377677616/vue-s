(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-161cf24a"],{"0548":function(t,e,s){"use strict";var n=s("8473e"),i=s.n(n);i.a},"71c2":function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"header"},[s("div",{staticClass:"wrap"},[t.isBack?s("div",{staticClass:"back",on:{click:t.back}},[s("i",{staticClass:"iconfont icon-fanhui1"})]):t._e(),s("h3",[t._v(t._s(t.title))])])])},i=[],a={name:"",props:{title:{type:String,default:"页面标题"},isBack:{type:Boolean,default:!0}},data:function(){return{}},methods:{back:function(){var t=sessionStorage.getItem("prevPage")||"/";this.$router.replace(t),sessionStorage.setItem("prevPage","")}}},c=a,o=(s("0548"),s("9ca4")),r=Object(o["a"])(c,n,i,!1,null,"20ec2505",null);e["a"]=r.exports},"7e5c":function(t,e,s){"use strict";var n=s("801d"),i=s.n(n);i.a},"801d":function(t,e,s){},"8473e":function(t,e,s){},b116:function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"vue-event body",on:{touchmove:function(t){t.preventDefault()}}},[s("My-Header",{attrs:{title:t.pageTitle}}),s("div",{staticClass:"full-screen flex-cen"},[s("v-touch",{staticClass:"vue-event-box flex-cen",on:{swipeup:t.swipeup,swipedown:t.swipedown,swipeleft:t.swipeleft,swiperight:t.swiperight,pressup:t.pressup}},[t._v("对我进行"),s("br"),t._v("长按"),s("br"),t._v("向上"),s("br"),t._v("向下"),s("br"),t._v("向左"),s("br"),t._v("向右"),s("br"),t._v("滑动触摸")])],1)],1)},i=[],a=s("71c2"),c={name:"vue-event",data:function(){return{pageTitle:"vue触摸事件"}},methods:{swipeup:function(){this.$toast("向上滑动")},swipedown:function(){this.$toast("向下滑动")},swipeleft:function(){this.$toast("向左滑动")},swiperight:function(){this.$toast("向右滑动")},pressup:function(){this.$toast("长按成功")}},components:{MyHeader:a["a"]}},o=c,r=(s("7e5c"),s("9ca4")),u=Object(r["a"])(o,n,i,!1,null,"7f962b8b",null);e["default"]=u.exports}}]);