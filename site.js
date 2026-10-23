(function(){
  /* Paste your booking page link (Cal.com, Calendly or Google Calendar) between the quotes. Until then, Book a call opens an email. */
  var BOOKING_URL="";
  var EMAIL="wambuikungu99@gmail.com";

  document.querySelectorAll("[data-book]").forEach(function(a){
    if(BOOKING_URL){ a.href=BOOKING_URL; a.target="_blank"; a.rel="noopener"; }
    else { a.href="mailto:"+EMAIL+"?subject="+encodeURIComponent("Booking a call"); }
  });

  var copy=document.getElementById("copy");
  if(copy){
    copy.addEventListener("click",function(){
      function done(){ copy.textContent="Copied"; setTimeout(function(){copy.textContent="Copy address"},1800); }
      try{ navigator.clipboard.writeText(EMAIL).then(done,function(){ copy.textContent="Select the address above"; }); }
      catch(e){ copy.textContent="Select the address above"; }
    });
  }

  /* Master's fit quiz */
  var form=document.getElementById("quiz");
  if(form){
    var goalText={
      lead:"A master's can support a move into leadership, and employers also look at what you have delivered. Choose a programme with a leadership or management strand, and keep a record of results you can show.",
      switchto:"To move into data or AI, choose a programme with practical projects and build a portfolio while you study. The degree opens doors and the portfolio proves you can do the work.",
      abroad:"If you plan to work abroad or remotely, check that employers and the education or immigration bodies in your target country accept the degree before you pay anything.",
      growth:"Studying for its own sake is a good reason. Choose a subject you will still enjoy when the workload peaks."
    };
    var fundText={
      instalments:"Unicaf advertises scholarships with the remaining balance paid in small monthly instalments. Ask for your scholarship percentage and the full instalment schedule in writing.",
      upfront:"If you prefer to pay more upfront, ask Unicaf whether that changes your total, because their public pages do not say.",
      employer:"If your employer will sponsor you, ask Unicaf which documents they need, and agree with your employer what happens if you change jobs mid-programme."
    };
    var hoursText={
      low:{t:"Plan before you apply",p:"Check how many hours a week each programme expects. If that is more than you can give right now, plan a later start date."},
      mid:{t:"A good time to explore",p:"Ask each programme for its weekly hours and deadlines, then protect fixed study slots in your calendar before you commit."},
      high:{t:"A good time to explore",p:"With ten or more hours a week you have room to keep up with the course and still build work you can show employers."}
    };
    form.addEventListener("submit",function(e){
      e.preventDefault();
      var d=new FormData(form), g=d.get("goal"), h=d.get("hours"), f=d.get("fund");
      var box=document.getElementById("quiz-result");
      if(!g||!h||!f){ box.hidden=false; box.innerHTML="<p>Please answer all three questions to see your result.</p>"; return; }
      var ht=hoursText[h];
      box.hidden=false;
      box.innerHTML="<h3>"+ht.t+"</h3><p>"+goalText[g]+"</p><p>"+fundText[f]+"</p><p>"+ht.p+"</p>"+
        '<a class="btn primary" href="https://apply.unicaf.org/refer-a-friend/en?refcode=xoFlb4EwkB" target="_blank" rel="noopener sponsored">See Unicaf master\'s options ↗</a>';
      box.scrollIntoView({behavior:"smooth",block:"nearest"});
    });
  }

  /* Instalment calculator: uses the visitor's own numbers */
  var fee=document.getElementById("fee");
  if(fee){
    var pct=document.getElementById("pct"), pctOut=document.getElementById("pct-out"),
        mon=document.getElementById("months"), monOut=document.getElementById("months-out"),
        outM=document.getElementById("out-monthly"), outT=document.getElementById("out-total");
    var nf=new Intl.NumberFormat("en",{maximumFractionDigits:0});
    function calc(){
      var f=parseFloat(fee.value)||0, p=parseFloat(pct.value)||0, m=parseInt(mon.value,10)||1;
      pctOut.textContent=p+"%"; monOut.textContent=m+" months";
      var total=f*(1-p/100);
      outT.textContent=nf.format(total); outM.textContent=nf.format(total/m);
    }
    [fee,pct,mon].forEach(function(el){ el.addEventListener("input",calc); });
    calc();
  }
})();
