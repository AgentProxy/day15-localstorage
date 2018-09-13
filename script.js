const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.bands');
const items = JSON.parse(localStorage.getItem('items')) || [];
const checkboxes = document.querySelectorAll('input[type=checkbox]')

addItems.addEventListener('submit', addBand);
itemsList.addEventListener('click', toggleDone);

function addBand(e){
    e.preventDefault();

    const text = (this.querySelector('[name=item]')).value
    const item = {
        text,
        done: false,
    };
    items.push(item);
    populateBands(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

function populateBands(bands = [],bandsList){
    bandsList.innerHTML = bands.map((band,i) => {
        return `
        <li>
            <input type="checkbox" data-index=${i} id="item${i}" ${band.done? 'checked': ''}/>
            <label for="item${i}">${band.text}</label>
        </li>
        `;
    }).join("");
}

function toggleDone(e){
    if(e.target.matches('input')){
        const el = e.target;
        const index = el.dataset.index;
        items[index].done = !items[index].done;
        localStorage.setItem('items', JSON.stringify(items));
    } 
}


function checkAll(){
    items.forEach(item => {
        item.done = true;
        localStorage.setItem('items', JSON.stringify(items));
    });
    populateBands(items,itemsList);
}

function uncheckAll(){
    items.forEach(item => {
        item.done = false;
        localStorage.setItem('items', JSON.stringify(items));
    });
    populateBands(items,itemsList);
}

function clearAll(){
    items.length = 0;
    localStorage.setItem('items', JSON.stringify(items));
    populateBands(items,itemsList);
}

populateBands(items, itemsList);

