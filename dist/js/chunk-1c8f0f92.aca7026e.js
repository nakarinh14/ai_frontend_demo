(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1c8f0f92"],{5395:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"covid-page setting-page"},[n("header",{staticClass:"page-header"},[n("span",{staticClass:"header-back",on:{click:function(e){return t.$router.go(-1)}}},[n("svg-icon",{attrs:{"icon-class":"gray-btn"}})],1),n("div",{staticClass:"header-content"},[t._v(t._s(t.$t("setting.title")))])]),n("section",{staticClass:"setting-content"},[n("ul",{staticClass:"setting-list"},[t.isLogin?n("li",{staticClass:"setting-item"},[n("span",{staticClass:"setting-msg"},[t._v(t._s(t.$t("setting.message")))]),n("van-switch",{attrs:{"active-color":"#D8182D",size:"20px"},model:{value:t.checked,callback:function(e){t.checked=e},expression:"checked"}})],1):t._e(),t.isLogin?n("router-link",{staticClass:"setting-item",attrs:{to:"/mine/changePassword",tag:"li"}},[n("span",{staticClass:"setting-msg"},[t._v(t._s(t.$t("password.title")))]),n("van-icon",{staticClass:"icon",attrs:{name:"arrow"}})],1):t._e(),n("router-link",{staticClass:"setting-item",attrs:{tag:"li",to:"/setting/faq"}},[n("span",{staticClass:"setting-msg"},[t._v(t._s(t.$t("setting.faq")))]),n("van-icon",{staticClass:"icon",attrs:{name:"arrow"}})],1),n("li",{staticClass:"setting-item",on:{click:function(e){t.showAgreement=!0}}},[n("span",{staticClass:"setting-msg"},[t._v(t._s(t.$t("setting.agreement")))]),n("van-icon",{staticClass:"icon",attrs:{name:"arrow"}})],1),n("router-link",{staticClass:"setting-item",attrs:{tag:"li",to:"/setting/language"}},[n("span",{staticClass:"setting-msg"},[t._v(t._s(t.$t("setting.language")))]),n("van-icon",{staticClass:"icon",attrs:{name:"arrow"}})],1),n("router-link",{staticClass:"setting-item",attrs:{tag:"li",to:"/setting/aboutAs"}},[n("span",{staticClass:"setting-msg"},[t._v(t._s(t.$t("about.title")))]),n("van-icon",{staticClass:"icon",attrs:{name:"arrow"}})],1)],1)]),t.isLogin?n("div",{staticClass:"covid-btns"},[n("van-button",{staticClass:"covid-btn",attrs:{type:"info"},on:{click:t.logout}},[t._v("\n      "+t._s(t.$t("setting.logout"))+"\n    ")])],1):t._e(),null!=t.remoteAgreement&&t.remoteAgreement.is_active?n("van-dialog",{attrs:{showCancelButton:!1,title:"th"===t.language?t.remoteAgreement.title_th:t.remoteAgreement.title_en},model:{value:t.showAgreement,callback:function(e){t.showAgreement=e},expression:"showAgreement"}},["zh"===t.language?n("div",{staticClass:"agreement-content",domProps:{innerHTML:t._s(t.remoteAgreement.content)}}):t._e(),"en"===t.language?n("div",{staticClass:"agreement-content",domProps:{innerHTML:t._s(t.remoteAgreement.content_en)}}):t._e(),"th"===t.language?n("div",{staticClass:"agreement-content",domProps:{innerHTML:t._s(t.remoteAgreement.content_th)}}):t._e(),"hk"===t.language?n("div",{staticClass:"agreement-content",domProps:{innerHTML:t._s(t.remoteAgreement.content_hk)}}):t._e()]):t._e()],1)},a=[],i=(n("ac6a"),n("f3e2"),n("ca00")),o=n("12cb"),c={name:"Setting",data:function(){return{checked:!1,isLogin:Object(i["a"])(),language:Object(o["b"])(),showAgreement:!1,remoteAgreement:null}},methods:{logout:function(){localStorage.removeItem("user"),this.$router.push("/login")},checkProperty:function(){var t=this;this.$http.get("/api/property/all").then((function(e){0==e.data.code&&e.data.data.forEach((function(e){"AGREEMENT"===e.property&&(""!==e.title_en&&null!=e.title_en||(e.title_en=e.title),""!==e.title_hk&&null!=e.title_hk||(e.title_hk=e.title),""!==e.title_th&&null!=e.title_th||(e.title_th=e.title),""!==e.content_en&&null!=e.content_en||(e.content_en=e.content),""!==e.content_hk&&null!=e.content_hk||(e.content_hk=e.content),""!==e.content_th&&null!=e.content_th||(e.content_th=e.content),t.remoteAgreement=e)}))}))}},created:function(){this.checkProperty()}},l=c,r=(n("5961"),n("2877")),g=Object(r["a"])(l,s,a,!1,null,"a7476658",null);e["default"]=g.exports},5961:function(t,e,n){"use strict";var s=n("cd06"),a=n.n(s);a.a},cd06:function(t,e,n){}}]);
//# sourceMappingURL=chunk-1c8f0f92.aca7026e.js.map