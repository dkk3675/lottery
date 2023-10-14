(this["webpackJsonplottery-react"]=this["webpackJsonplottery-react"]||[]).push([[0],{26:function(e,t,n){},27:function(e,t,n){},34:function(e,t,n){"use strict";n.r(t);var a=n(1),s=n.n(a),r=n(13),c=n.n(r),o=(n(26),n(4)),i=n(10),u=n(5),l=n(6),h=n(19),p=n(18),d=(n(27),n(17)),b=new(n.n(d).a)(window.ethereum),m=new b.eth.Contract([{constant:!0,inputs:[],name:"manager",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[],name:"pickWinner",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{constant:!0,inputs:[],name:"getPlayers",outputs:[{name:"",type:"address[]"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"winner",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[],name:"enter",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{constant:!0,inputs:[{name:"",type:"uint256"}],name:"players",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{inputs:[],payable:!1,stateMutability:"nonpayable",type:"constructor"}],"0x2c06AFe194FA2942DDcF9DabCaB9B79E2DF396F3"),j=n(36),f=n.p+"static/media/lottery.1bae6b1d.png",w=n(8),y=(n(28),n(3)),g=function(e){Object(h.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(u.a)(this,n),(a=t.call(this,e)).handleAccountsChanged=function(e){var t=a.state.manager.toLowerCase()===e[0].toLowerCase();a.setState({isManager:t})},a.onSubmit=function(){var e=Object(i.a)(Object(o.a)().mark((function e(t){var n;return Object(o.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!(a.state.value<=.01)){e.next=4;break}return a.showErrorMessage("Ether of value greater than 0.01 ether is required to enter"),e.abrupt("return");case 4:return a.setState({button:!1}),e.next=7,b.eth.getAccounts();case 7:return n=e.sent,a.showWaitingForTransactionMessage(),e.next=11,m.methods.enter().send({from:n[0],value:b.utils.toWei(a.state.value,"ether")}).then(function(){var e=Object(i.a)(Object(o.a)().mark((function e(t){var n,s;return Object(o.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return w.b.dismiss(),a.showTransactionMessage("Transaction completed. Transaction ID - ".concat(t.transactionHash)),e.next=4,m.methods.getPlayers().call();case 4:return n=e.sent,e.next=7,b.eth.getBalance(m.options.address);case 7:s=e.sent,a.setState({players:n,balance:s,value:""});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){w.b.dismiss(),a.showErrorMessage("Transaction Aborted by User.")}));case 11:a.setState({button:!0});case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.showTransactionMessage=function(e){w.b.success(e,{position:"top-left",autoClose:!1,closeOnClick:!0,style:{width:"fit-content"}})},a.showWaitingForTransactionMessage=function(){w.b.info("Waiting for transaction to complete...",{position:"top-left",autoClose:!1,closeOnClick:!1,closeButton:!1})},a.showErrorMessage=function(e){w.b.error(e,{position:"top-left",autoClose:3e3})},a.onClick=Object(i.a)(Object(o.a)().mark((function e(){var t;return Object(o.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.eth.getAccounts();case 2:if((t=e.sent)[0]===a.state.manager){e.next=6;break}return a.showErrorMessage("You do not have the authority."),e.abrupt("return");case 6:if(0!==a.state.players.length){e.next=9;break}return a.showErrorMessage("No players found."),e.abrupt("return");case 9:return a.setState({button:!1}),a.showWaitingForTransactionMessage(),e.next=13,m.methods.pickWinner().send({from:t[0]}).then(function(){var e=Object(i.a)(Object(o.a)().mark((function e(t){return Object(o.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.methods.winner().call().then(function(){var e=Object(i.a)(Object(o.a)().mark((function e(t){var n;return Object(o.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=(new Date).toLocaleString("en",{timeZoneName:"long",timeZone:"IST",weekday:"short",year:"numeric",month:"short",day:"numeric",hour12:!0,hour:"numeric",minute:"numeric",second:"numeric"}),e.next=3,j.a.post("http://ec2-65-2-85-28.ap-south-1.compute.amazonaws.com:3001",{winner:t,no_of_participations:a.state.players.length,value:b.utils.fromWei(a.state.balance,"ether")}).then((function(e){w.b.dismiss(),a.showTransactionMessage("A winner has been picked."),a.setState({players:[],balance:"",previousWinner:"".concat(e.data.winner," [ declared on ").concat(n," ] won ").concat(e.data.value," ether")})})).catch((function(e){return console.log(e)}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){w.b.dismiss(),a.showErrorMessage("Winner is not picked yet as per manager's preferences.")}));case 13:a.setState({button:!0});case 14:case"end":return e.stop()}}),e)}))),a.state={manager:"",players:[],balance:"",value:"",previousWinner:"--",button:!0,isManager:!1},a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=Object(i.a)(Object(o.a)().mark((function e(){var t,n,a,s,r,c,i;return Object(o.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(window.ethereum){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,window.ethereum.request({method:"eth_requestAccounts"});case 4:return t=e.sent,window.ethereum.on("accountsChanged",this.handleAccountsChanged),e.next=8,m.methods.manager().call();case 8:return n=e.sent,a=n.toLowerCase()===t[0].toLowerCase(),e.next=12,m.methods.getPlayers().call();case 12:return s=e.sent,e.next=15,b.eth.getBalance(m.options.address);case 15:return r=e.sent,e.next=18,j.a.get("http://ec2-65-2-85-28.ap-south-1.compute.amazonaws.com:3001").catch((function(e){return console.log(e)}));case 18:c=e.sent,i=new Date(c.data.createdAt),this.setState({manager:n,players:s,balance:r,previousWinner:c.data.id?"".concat(c.data.winner," [ declared on ").concat(i.toLocaleString("en",{timeZoneName:"long",timeZone:"IST",weekday:"short",year:"numeric",month:"short",day:"numeric",hour12:!0,hour:"numeric",minute:"numeric",second:"numeric"})," ] won ").concat(c.data.value," ether"):"--",isManager:a});case 21:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){window.ethereum&&window.ethereum.removeListener("accountsChanged",this.handleAccountsChanged)}},{key:"render",value:function(){var e=this;return Object(y.jsxs)("div",{className:"App",children:[Object(y.jsx)(w.a,{position:"top-left"}),Object(y.jsx)("img",{src:f,alt:"Lottery",className:"lottery-image"}),Object(y.jsx)("h2",{children:"LOTTERY CONTRACT"}),window.ethereum&&window.ethereum.selectedAddress&&Object(y.jsxs)("p",{children:["The manager of this contract is ",Object(y.jsx)("b",{children:this.state.manager}),". There are currently ",Object(y.jsxs)("b",{children:[this.state.players.length," people"]})," entered, competing to win"," ",Object(y.jsxs)("b",{children:[b.utils.fromWei(this.state.balance,"ether")," ethers"]}),"."]}),Object(y.jsx)("hr",{}),window.ethereum?Object(y.jsx)("div",{children:window.ethereum.selectedAddress?Object(y.jsxs)("div",{children:[Object(y.jsxs)("form",{onSubmit:this.onSubmit,className:"entry-form",children:[Object(y.jsx)("h4",{children:"Want to try your luck?"}),Object(y.jsxs)("div",{className:"input-container",children:[Object(y.jsx)("label",{children:"Amount of ether to enter"}),Object(y.jsx)("input",{type:"number",placeholder:"Enter value > 0.01 ether",value:this.state.value,onChange:function(t){return e.setState({value:t.target.value})},required:!0})]}),Object(y.jsx)("button",{className:"entry-button",disabled:""===this.state.manager||!this.state.button,onClick:this.openModal,children:"Enter"})]}),this.state.isManager&&Object(y.jsxs)("div",{className:"winner-section",children:[Object(y.jsx)("hr",{}),Object(y.jsx)("h4",{children:"Time to pick a Winner"}),Object(y.jsx)("button",{onClick:this.onClick,className:"winner-button",disabled:!this.state.button,children:"Pick a Winner"})]}),Object(y.jsx)("hr",{}),Object(y.jsxs)("h4",{className:"previous-winner",children:["Recent Winner: ",this.state.previousWinner]})]}):Object(y.jsx)("div",{className:"no-metamask",children:Object(y.jsx)("p",{children:"Please connect to Metamask to use this application."})})}):Object(y.jsx)("div",{className:"no-metamask",children:Object(y.jsx)("p",{children:"Please install Metamask to use this application."})})]})}}]),n}(s.a.Component),v=g;c.a.render(Object(y.jsx)(s.a.StrictMode,{children:Object(y.jsx)(v,{})}),document.getElementById("root"))}},[[34,1,2]]]);
//# sourceMappingURL=main.30e1fcf5.chunk.js.map