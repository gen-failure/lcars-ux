export default class LcarsUX {
  constructor(element) {
    this.element = element;
    this.contentWindow = this.element.querySelector('div.content');
    this.observer = new MutationObserver(this.domChanged)
    this.observer.observe(this.contentWindow,{ attributes: true, childList: true, subTree: true });
    //FIXME close observer when element is detached
    this.enhancementTypes = {
      'label' : {
        'lcars-checkbox' : this.enhanceCheckbox
      }
    }
    this.enhanceAll();
  }

  domChanged(mutations) {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        console.log(node);
      });
    });
  }

  /**
   *  Use only once when lcars window is initialized
   */
  enhanceAll() {
    Object.keys(this.enhancementTypes).forEach((tag) => {
      Object.keys(this.enhancementTypes[tag]).forEach((cls) => {
        let targets = this.contentWindow.getElementsByTagName(tag);
        for(let i = 0; i <= targets.length; i++) {
          if (targets[i].classList.contains(cls)) {
            this.enhancementTypes[tag][cls](targets[i]);
          }
        }
      });
    });
  }

  enhanceCheckbox(element) {
    console.log(element);
    let label = element.querySelector('span');
    let checkbox = element.querySelector('input');
    
    label.style.display = 'none';
    checkbox.style.display = 'none';

    let css = ['checkbox','lcars-button'];
    element.classList.forEach((cls) => {
      if (cls !== 'lcars-checkbox') css.push(cls);
    });

    if (checkbox.checked) { 
      css.push('on')
    } else {
      css.push('off'); 
    }
    
    let newCB = document.createElement('button');
    newCB.innerHTML = label.innerHTML;
    let actionClass = "off";
    newCB.setAttribute('class',css.join(' '));
    newCB.setAttribute('data-label-on','ON');
    newCB.setAttribute('data-label-off','OFF');


    newCB.addEventListener('click', () => {
      if (checkbox.checked) {
        checkbox.removeAttribute('checked');
        newCB.classList.remove('on');
        newCB.classList.add('off');
      } else {
        checkbox.setAttribute('checked','checked');
        newCB.classList.remove('off');
        newCB.classList.add('on');
      }
    });
    element.appendChild(newCB);
  }
}
