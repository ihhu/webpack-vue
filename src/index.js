(()=>{
    const div=document.createElement("div");
    div.innerHTML="hello webpack";
    class Studen {
        constructor(name){
            this.name=name;
        }

    }
    var jon = new Studen("Jon");
    console.log("hello webpack", jon.name);
    document.body.appendChild(div);
})();


