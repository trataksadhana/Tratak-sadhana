document.querySelectorAll(".faq-list button").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const open=btn.classList.contains("active");
    document.querySelectorAll(".faq-list button").forEach(b=>b.classList.remove("active"));
    if(!open)btn.classList.add("active");
  });
});
const modal=document.getElementById("payment-modal");
document.querySelectorAll(".payment-button").forEach(b=>b.addEventListener("click",()=>modal.classList.add("show")));
document.querySelector(".close").addEventListener("click",()=>modal.classList.remove("show"));
modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("show")});
document.getElementById("demo-payment").addEventListener("click",()=>alert("Razorpay will be connected in the next step."));
document.getElementById("year").textContent=new Date().getFullYear();
