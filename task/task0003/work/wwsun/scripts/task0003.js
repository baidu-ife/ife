// todo: mock data - obsolete temp
var categories = [
    {id:1, name:"百度IFE项目", parent: "", subCategories: ["task1"], tasks:['todo-1','todo-2']},
    {id:2, name:"task1", parent: 1, subCategories: [], tasks:['todo-3','todo-4']},
    {id:3, name:"默认分类", parent: "", subCategories: [], tasks:['todo-11','todo-12']}
];

// now only support two level category
function buildCategoryMenu() {
    var i,
        n;
    var list = $('#categoryList');

    list.innerHTML = '';

    for (i=0, n=categories.length; i<n; i++) {

        if(categories[i].parent==="") {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.setAttribute('href','#');
            a.innerHTML = categories[i].name;
            li.appendChild(a);

            // add secondary categories
            if(categories[i].subCategories.length > 0) {
                var subul = document.createElement('ul');
                var j,
                    m;
                for (j=0, m=categories[i].subCategories.length; j<m; j++) {
                    var subli = document.createElement('li');
                    var suba = document.createElement('a');
                    suba.setAttribute('href','#');
                    suba.innerHTML = categories[i].subCategories[j];
                    subli.appendChild(suba);
                    subul.appendChild(subli);
                }
                li.appendChild(subul);
            }

            list.appendChild(li);
        }

    }
}

function setupCategoryDropdownMenu() {
    var i,
        n;

    var select = $('#parentInput');

    select.innerHTML = '';

    var defaultOption = document.createElement('option');
    defaultOption.setAttribute('value',"");
    defaultOption.innerHTML = '无父类';
    select.appendChild(defaultOption);

    for (i=0, n=categories.length; i<n; i++) {
        if(categories[i].parent==="") {
            var option = document.createElement('option');
            option.setAttribute('value', categories[i].name);
            option.innerHTML = categories[i].name;
            select.appendChild(option);
        }

    }
}

function getCategoryByName(name) {
    var i,
        n;

    for (i=0, n=categories.length; i<n; i++) {
        if(categories[i].name === name) {
            return categories[i];
        }
    }
}

function addNewCategory(name, parent) {
    var category = new Category(name, parent, 0);
    categories.push(category);
}

// event binding

$.click('#newCategoryBtn', function() {
    var form = $('#newCategoryForm');
    var name = form.elements['name'].value;

    var select = $('#parentInput');
    var parent = select.options[select.selectedIndex].value;

    console.log(parent);

    if (parent != '') {
        // find parent item, and put name into the sub-categories
        var category = getCategoryByName(parent);
        category.subCategories.push(name);
    }

    addNewCategory(name, parent);

    buildCategoryMenu();
});

// App start

setupCategoryDropdownMenu();

buildCategoryMenu();
//refreshCategoryList();

// App test


function print() {
    var i, n;
    for (i=0, n=categories.length; i<categories.length; i++) {
        console.log(categories[i]);
    }
}