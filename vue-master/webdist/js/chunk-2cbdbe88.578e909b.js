(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2cbdbe88"],{"01bd":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"body"},[a("my-header",{attrs:{title:t.pageTitle}}),a("div",{staticClass:"full-screen"})],1)},n=[],c=a("71c2"),i={name:"",data:function(){return{pageTitle:"这是页面标题"}},components:{MyHeader:c["a"]}},r=i,l=a("9ca4"),o=Object(l["a"])(r,s,n,!1,null,"04713b26",null);e["default"]=o.exports},"0548":function(t,e,a){"use strict";var s=a("8473e"),n=a.n(s);n.a},"71c2":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"header"},[a("div",{staticClass:"wrap"},[t.isBack?a("div",{staticClass:"back",on:{click:t.back}},[a("i",{staticClass:"iconfont icon-fanhui1"})]):t._e(),a("h3",[t._v(t._s(t.title))])])])},n=[],c={name:"",props:{title:{type:String,default:"页面标题"},isBack:{type:Boolean,default:!0}},data:function(){return{}},methods:{back:function(){var t=sessionStorage.getItem("prevPage")||"/";this.$router.replace(t),sessionStorage.setItem("prevPage","")}}},i=c,r=(a("0548"),a("9ca4")),l=Object(r["a"])(i,s,n,!1,null,"20ec2505",null);e["a"]=l.exports},"8473e":function(t,e,a){}}]);