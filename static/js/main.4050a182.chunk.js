(this["webpackJsonpmedp341-final-project"]=this["webpackJsonpmedp341-final-project"]||[]).push([[0],{17:function(e,t,n){},18:function(e){e.exports=JSON.parse('[{"situation":"You have a test next week","optionBad":"Your\'e gonna fail anyways","optionGood":"I just have to do what I can"},{"situation":"You have an audition tomorrow","optionBad":"What if they laugh at you","optionGood":"I practiced and I just have to trust in myself."},{"situation":"You have a group project","optionBad":"Communicating with others is impossible","optionGood":"I just have to plan and manage time with the others as best as I can"},{"situation":"You have homework tonight","optionBad":"I said I would start at 6 but it\'s 6:01 now and it\'s too late, guess I\'ll start at 7","optionGood":"I have to prioritze doing my homework"},{"situation":"You have an interview later","optionBad":"You\'re gonna fail anyways","optionGood":"The worst that can happen is I get rejected, but I will gain valuable experience"},{"situation":"You need to apply for your school","optionBad":"I\'ll never beat the competition","optionGood":"I have just as much as a chance as everyone else if I put my best self forward."},{"situation":"You need to go to the gym","optionBad":"Maybe some other time","optionGood":"Working out is important for my health."},{"situation":"You need to apply for your school","optionBad":"I\'ll never beat the competition","optionGood":"I have just as much as a chance as everyone else if I put my best self forward."},{"situation":"You have an 8AM class","optionBad":"Im too tired, it\'s not worth it.","optionGood":"Class is important."},{"situation":"You have chores to do","optionBad":"I\'ll just skip them","optionGood":"I have to be responsible"}]')},27:function(e,t,n){e.exports=n(39)},32:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),s=n(23),i=n.n(s),r=(n(32),n(9)),l=n(10),c=n(12),u=n(11),d=n(25),m=n(1),p=(n(17),n(18)),h=n(41),y=n(42),g=function(e){Object(c.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(r.a)(this,n);for(var a=arguments.length,o=new Array(a),s=0;s<a;s++)o[s]=arguments[s];return(e=t.call.apply(t,[this].concat(o))).state={minutes:e.props.minutes||3,seconds:e.props.seconds||30},e.addTime=function(t){var n=e.convertTimetoSecs(e.state),a=e.convertSecsToTime(n+t);e.setState({seconds:a.seconds,minutes:a.minutes})},e.loseTime=function(t){var n=e.convertTimetoSecs(e.state),a=e.convertSecsToTime(n-t>=0?n-t:0);e.setState({seconds:a.seconds,minutes:a.minutes})},e.resetTime=function(){e.setState({minutes:3,seconds:30}),e.componentDidMount()},e.convertSecsToTime=function(e){var t=Math.floor(e/60);return{minutes:t,seconds:e-60*t}},e.convertTimetoSecs=function(e){return 60*e.minutes+e.seconds},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.props.addTime(this.addTime),this.props.loseTime(this.loseTime),this.props.resetTime(this.resetTime),this.myInterval=setInterval((function(){var t=e.state,n=t.seconds,a=t.minutes;n>0&&(e.props.setSeconds&&e.props.setSeconds(n-1),e.setState((function(e){return{seconds:e.seconds-1}}))),0===n&&(0===a?(clearInterval(e.myInterval),e.props.setMinutes&&e.props.setMinutes(0),e.props.setSeconds&&e.props.setSeconds(0)):(e.props.setMinutes&&e.props.setMinutes(a-1),e.props.setSeconds&&e.props.setSeconds(59),e.setState((function(e){return{minutes:e.minutes-1,seconds:59}}))))}),1e3)}},{key:"componentWillUnmount",value:function(){clearInterval(this.myInterval)}},{key:"render",value:function(){var e=this.state,t=e.minutes,n=e.seconds,a=t>0?120/t<40?40:120/t:180-n,s=t<=1?"red":"black";return o.a.createElement("div",null,o.a.createElement("div",null,(t>0||n>0)&&o.a.createElement("h1",null,"Timer:"),0===t&&0===n?o.a.createElement("h1",{class:"wiggle",style:{fontSize:120,color:"red",width:"inherit",textAlign:"center"}},"Times Up!"):o.a.createElement("h1",{class:t<=1?"wiggleSlow":"",style:{fontSize:a,color:s}},t,":",n<10?"0".concat(n):n)))}}]),n}(a.Component),v=function(e){Object(c.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).componentDidMount=function(){var e="You are practicing very healthy habits. You are making good decisions that make juggling your responsibilities managable . You are making satisfactory progress towards your goals. You are a well put together person, You are practicing very healthy habits. You are very responsible. You are have a productive day. Having a productive day means you are successful . Keep it up! Maintain your healthy habits and keep striving for success, and you will reach your dreams.".split(" ").map((function(e,t){return{index:t,word:e,display:e,style:{display:"inline-block",margin:"3px"},rotateBy:0,marginBy:2}}));a.setState({wordsAndStyles:e})},a.generateRandomStyle=function(e){var t=e.rotateBy,n=e.marginBy,a=Math.floor(Math.random()+10-5),o=["red","black","black","#4a0417","black","#fcba03","#4a0417","red"],s=[100,400,700],i=Math.floor(201*Math.random()-100);return{display:"inline-block",transform:"rotate(".concat(t+i,"deg)"),margin:"".concat(n+a,"px"),fontWeight:s[Math.floor(Math.random()*s.length)],color:o[Math.floor(Math.random()*o.length)],fontFamily:"Special Elite"}},a.breakParagraph=function(e){for(var t=a.state.wordsAndStyles,n=t,o=e?5:15,s=0;s<o;s++){var i=Math.floor(Math.random()*t.length),r=t[i].index,l={display:"inline-block",margin:"3px"};e?(l=a.generateRandomStyle(t[i]),a.goodWords.includes(n[r].word)&&(n[r].display=a.antonyms[n[r].word])):(n[r].word!==n[r].display&&(n[r].display=n[r].word),a.goodWords.includes(n[r].display)&&(l={display:"inline-block",margin:"3px",color:"green"})),n[r].style=l}a.setState({wordsAndStyles:n})},a.generateParagraph=function(){return a.state.wordsAndStyles.map((function(e,t){return o.a.createElement("span",{id:"word-".concat(t),style:e.style},e.display+" ")}))},a.handleAnswer=function(e){var t=a.state,n=t.questionNumber,o=t.productivityCount,s=t.unproductiveCount;"bad"===e?(a.setState({unproductiveCount:s+1}),a.breakParagraph(!0)):(a.setState({productivityCount:o+1}),a.breakParagraph(!1)),a.setState({questionNumber:n>=p.length-1?0:n+1})},a.displayQuestion=function(e){var t=e.situation,n=e.optionBad,s=e.optionGood,i=a.state,r=i.minutes,l=i.seconds;return 0===r&&0===l?o.a.createElement("div",null,o.a.createElement(h.a,{variant:"secondary",size:"lg",onClick:a.replay,style:{backgroundColor:"#1aabab",margin:"5px",width:"25%",height:"70px",fontSize:"1vw"}},"You are out of time! Play Again")):o.a.createElement("div",null,o.a.createElement("h2",{style:{color:"#1d365e",fontWeight:600}},t),o.a.createElement("br",null),o.a.createElement(h.a,{variant:"secondary",size:"lg",onClick:function(){a.handleAnswer("bad"),a.displayTimeMessage("-20","red"),a.loseTime(10)},style:{backgroundColor:"#1aabab",margin:"5px",width:"25%",height:"70px",fontSize:"1vw"}},n),o.a.createElement(h.a,{variant:"secondary",size:"lg",onClick:function(){a.handleAnswer("good"),a.displayTimeMessage("+5","green"),a.addTime(5)},style:{backgroundColor:"#1aabab",margin:"5px",width:"25%",height:"70px",fontSize:"1vw"}},s))},a.displayTimeMessage=function(e,t){var n=document.createElement("div");n.textContent=e,n.className="timeMessage",n.style.color=t,document.body.appendChild(n);var a=setTimeout((function(){var e=document.getElementsByClassName("timeMessage");e[0].parentNode.removeChild(e[0])}),1e3);clearInterval(a)},a.setMinutes=function(e){a.setState({minutes:e})},a.setSeconds=function(e){a.setState({seconds:e})},a.replay=function(){a.componentDidMount(),a.setState({minutes:30,seconds:30,done:!1,productivityCount:0,unproductiveCount:0}),a.resetTime()},a.state={questionNumber:0,wordsAndStyles:[],productivityCount:0,unproductiveCount:0,timesUp:!1,minutes:3,seconds:30},a.goodWords=["good","healthy","well","satisfactory","progress","managable","balanced","organized","together","responsible","productive","successful"],a.antonyms={good:"bad",healthy:"unhealthy",well:"not well",satisfactory:"disatisfactory",progress:"procrastination",managable:"unmanagable",balanced:"unbalanced",organized:"disorganized",together:"broken",responsible:"irresponsible",productive:"unproductive",successful:"unsuccessful"},a.styles={progressBars:{width:"75%",textAlign:"left",margin:"50px auto",float:"right",marginLeft:"5vw"},mybody:{margin:"1% 7%",textAlign:"center"}},a}return Object(l.a)(n,[{key:"render",value:function(){var e=this,t=this.state,n=t.questionNumber,a=t.productivityCount,s=t.unproductiveCount,i=a+s<=3?100-20*s:Math.round(a/(a+s)*100),r=a+s<=3?20*s:Math.round(s/(a+s)*100),l=function(e){return e>60?"success":e<40?"danger":"warning"},c=this.state.wordsAndStyles.length&&this.generateParagraph();return o.a.createElement("div",{className:"App"},o.a.createElement("div",{style:this.styles.mybody},o.a.createElement("h1",{className:"title"},"Performance Simulation"),o.a.createElement("br",null),o.a.createElement("div",{className:"introp",style:{display:"block"}},c),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("p",{style:{color:"grey"}},"Select your thoughts or decision for each prompt:"),o.a.createElement("div",null,this.displayQuestion(p[n])),o.a.createElement("div",{style:this.styles.progressBars},o.a.createElement("label",null,"Productivity:"),o.a.createElement("br",null),o.a.createElement(y.a,{animated:!0,now:i,variant:l(i),label:"".concat(i,"%")}),o.a.createElement("br",null),o.a.createElement("label",null,"Anxiety:"),o.a.createElement(y.a,{animated:!0,now:r,variant:l(100-r),label:"".concat(r,"%")}),o.a.createElement("br",null),o.a.createElement("label",null,"Ability to perform future tasks:"),o.a.createElement(y.a,{animated:!0,now:100,variant:"info",label:"100%"})),o.a.createElement("div",{style:{textAlign:"left",position:"absolute",bottom:20,left:20,width:"20%",font:"initial"}},o.a.createElement(g,{setMinutes:this.setMinutes,setSeconds:this.setSeconds,addTime:function(t){return e.addTime=t},loseTime:function(t){return e.loseTime=t},resetTime:function(t){return e.resetTime=t}}))))}}]),n}(a.Component),f=function(e){Object(c.a)(n,e);var t=Object(u.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement(d.a,{basename:"/"},o.a.createElement(m.a,{exact:!0,path:"/",component:v})))}}]),n}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(38);i.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(f,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[27,1,2]]]);
//# sourceMappingURL=main.4050a182.chunk.js.map