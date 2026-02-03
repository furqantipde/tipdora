import"./main-DliuGKoK.js";import{r as g}from"./CalculatorResult-CG6xskSt.js";document.addEventListener("DOMContentLoaded",()=>{const n=document.getElementById("course-list"),a=document.getElementById("result-container"),s=document.getElementById("btn-add-course"),c=document.getElementById("btn-calculate"),d=document.getElementById("btn-reset");function t(){const e=document.createElement("div");e.className="grid grid-cols-12 gap-4 items-center animate-fade-in",e.innerHTML=`
            <div class="col-span-5">
                <input type="text" class="input-field py-2" placeholder="e.g. Math">
            </div>
            <div class="col-span-3">
                <input type="number" class="input-field py-2 text-center course-credits" placeholder="3" value="3">
            </div>
            <div class="col-span-3">
                <select class="input-field py-2 course-grade">
                    <option value="4.0">A (4.0)</option>
                    <option value="3.7">A- (3.7)</option>
                    <option value="3.3">B+ (3.3)</option>
                    <option value="3.0">B (3.0)</option>
                    <option value="2.7">B- (2.7)</option>
                    <option value="2.3">C+ (2.3)</option>
                    <option value="2.0">C (2.0)</option>
                    <option value="1.7">C- (1.7)</option>
                    <option value="1.0">D (1.0)</option>
                    <option value="0.0">F (0.0)</option>
                </select>
            </div>
            <div class="col-span-1 text-center">
                <button class="text-slate-400 hover:text-red-500 transition btn-remove">
                    ✖
                </button>
            </div>
        `,e.querySelector(".btn-remove").addEventListener("click",()=>{n.children.length>1&&e.remove()}),n.appendChild(e)}t(),t(),t(),s?.addEventListener("click",t),c?.addEventListener("click",()=>{let e=0,o=0;const r=document.querySelectorAll(".course-credits"),u=document.querySelectorAll(".course-grade");if(r.forEach((v,m)=>{const i=parseFloat(v.value),l=parseFloat(u[m].value);!isNaN(i)&&!isNaN(l)&&(e+=i*l,o+=i)}),o===0)return;const p=e/o;g(a,{mainLabel:"Your GPA",mainValue:p.toFixed(2),subLabel:"Semester Grade Point Average",details:[{label:"Total Credits",value:o},{label:"Total Grade Points",value:e.toFixed(1)}]})}),d?.addEventListener("click",()=>{a.classList.add("hidden"),n.innerHTML="",t(),t(),t()})});
