console.log(["не успела доделать задание до конца."]/n 
["секции Coffee Shop, Library card и Contacts yt cjjndtncne.n ibhbyt 768px"]/n
["пункт 2 и пункт3 требований к верстке не соблюдены"])



const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");

hamburger.addEventListener("click" , () => {
    hamburger.classList.toggle("active");
    navList.classList.toggle("active");
})

document.querySelectorAll(".header-link").forEach(n => n.addEventListener("click" , () => {
    hamburger.classList.remove("active");
    navList.classList.remove("active");
}))