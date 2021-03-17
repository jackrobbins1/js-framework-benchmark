'use strict';

let startTime = {};
const start = function(name) {
    if (!startTime[name]) {
        startTime[name] = [ new Date().getTime()]    
    }    
};
const stop = function(name) {
    if (startTime[name]) {
        startTime[name].push(new Date().getTime())
        console.log('DooHTML', name, 'took:', startTime[name][1] - startTime[name][0]);
        startTime[name] = undefined
    }
};

const _random = ((max) => {
    return Math.round(Math.random()*1000)%max;
})

const adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
const colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
const nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];

const lenA = adjectives.length
const lenB = colours.length
const lenC = nouns.length



Doo.define(
  class Main extends Doo {
        constructor() {
            super(10000)
 			this.defaultDataSet = 'rows'
			this.ID = 1
            this.data = {
				[this.defaultDataSet]: []
			}
//            this.select = this.select.bind(this)
//            this.delete = this.delete.bind(this)
            this.add = this.add.bind(this)
            this.run = this.run.bind(this)
            this.runLots = this.runLots.bind(this)
            this.update = this.update.bind(this)
            this.clear = this.clear.bind(this)
            this.swaprows = this.swapRows.bind(this)
            //this.renderOnLoad = false
            this.addEventListeners()
            Main.xxx = document.getElementById("xxx");

        }
/*
        async init() {
            const observer = new MutationObserver(	
                (mutationsList, observer) => {	
                        if (mutationsList[0].type === 'childList' ) {
                                
                            this.componentContainer.style.visibility = 'visible'	
                                	
                        }	
                }			
            )	
            observer.observe(this.shadow.firstElementChild, { childList: true });	
	
    
        }
*/
        async dooAfterRender() {
            this.scrollElem = this.shadow.querySelector('.table')

        }    

    buildData(count = 1000) {
        const data = [];
 
        for (let i = 0; i < count; i++)
            data.push({id: this.ID++ , label: adjectives[_random(lenA)] + " " + colours[_random(lenB)] + " " + nouns[_random(lenC)] });
        return data;
    }
/*
    run() {
        this.removeAllRows();
        this.store.clear();
        this.data.rows = [];
        this.data = [];
        this.appendRows();
    }

    add() {
        this.store.add();
        this.appendRows();
    }
    update() {
        this.store.update();
        let len = this.data.length
        for (let i=0, len = this.data.length;i<len;i+=10) {
            this.rows[i].childNodes[1].childNodes[0].innerText = this.store.data[i].label;
        }
    }
    unselect() {
        if (this.selectedRow !== undefined) {
            this.selectedRow.className = "";
            this.selectedRow = undefined;
        }
    }
    recreateSelection() {
        let old_selection = this.store.selected;
        let sel_idx = this.store.data.findIndex(d => d.id === old_selection);
        if (sel_idx >= 0) {
            this.store.select(this.data[sel_idx].id);
            this.selectedRow = this.rows[sel_idx];
            this.selectedRow.className = "danger";
        }
    }
    delete(idx) {
        // Remove that row from the DOM
        this.store.delete(this.data[idx].id);
        this.rows[idx].remove();
        this.rows.splice(idx, 1);
        this.data.splice(idx, 1);
        this.unselect();
        this.recreateSelection();
    }
*/
/* =========================== */

    // render() {
    //     this.renderNode(this.place[0].templateArray,this.place[0].templateArray.xHtml, this.data.rows,  0, this.PAGE_SIZE)

    // }

/*
    async attributeChangedCallback(name, oldVal, newVal) {
		//TODO do we need length???
		if (newVal.length > 0 && oldVal !== newVal) {
			if (name === 'key') {
				console.log(oldval)
			} 	
		}	
	}
*/


    run() {
        start('buildData')
        this.data.rows = this.buildData()
        stop('buildData')
        start('run')
        this.renderAll()
        Main.xxx.focus()
        stop('run')
    }
    add() {
        this.data.rows = this.data.rows.concat(this.buildData())
        this.render()
    }

    runLots() {
        start('buildLots')
        this.data.rows = this.buildData(10000);
        stop('buildLots')
        start('runLots')
        this.renderAll()
        Main.xxx.focus()
        stop('runLots')
    }
    update() {
        for (let i=0, len = this.data.rows.length;i<len;i+=10) {
            this.data.rows[i].label += ' !!!';
        }
        this.render()
    }
    select(row,idx) {
 //       this.data.rows[idx].selected = !this.data.rows[idx].selected
 //       row.classList.toggle('danger')
    }


    clear() {
        this.data.rows = []
        this.render()
    }
    swapRows() {
        if (this.data.rows.length>10) {
            let r1 = this.data.rows[1];
            let r998 = this.data.rows[998];
            this.data.rows[1] = r998;
            this.data.rows[998] = r1;
       //     this.tbody.insertBefore(this.rows[998], this.rows[2])
       //     this.tbody.insertBefore(this.rows[1], this.rows[999])
     //       this.render()
        }


    }
    addEventListeners() {
        document.getElementById("main").addEventListener('click', e => {
            //console.log("listener",e);
            if (e.target.matches('#add')) {
                e.preventDefault();
                this.add();
            }
            else if (e.target.matches('#run')) {
                e.preventDefault();
                this.run();
            }
            else if (e.target.matches('#update')) {
                e.preventDefault();
                this.update();
            }
            else if (e.target.matches('#hideall')) {
                e.preventDefault();
                this.hideAll();
            }
            else if (e.target.matches('#showall')) {
                e.preventDefault();
                this.showAll();
            }
            else if (e.target.matches('#runlots')) {
                e.preventDefault();
                this.runLots();
            }
            else if (e.target.matches('#clear')) {
                e.preventDefault();
                this.clear();
            }
            else if (e.target.matches('#swaprows')) {
                e.preventDefault();
                this.swapRows();
            }
            else if (e.target.matches('.remove')) {
                e.preventDefault();
                let id = getParentId(e.target);
                let idx = this.findIdx(id);
                this.delete(idx);
            }
            else if (e.target.tagName === 'A') {
                e.preventDefault();
                //let id = getParentId(e.target);
                //let idx = this.findIdx(id);
                //console.log("select",idx);
                this.select(e.target);
            }
        });
    }   
})
