(function() {
    var lis = document.querySelectorAll('li');

    [].forEach.call(lis, function(li) {
        li.addEventListener('dragstart', handleDragStart, false);
        li.addEventListener('dragenter', handleDragEnter, false);
        li.addEventListener('dragover', handleDragOver, false);
        li.addEventListener('dragleave', handleDragLeave, false);
        li.addEventListener('drop', handleDrop, false);
        li.addEventListener('dragend', handleDragEnd, false);
    });


    var dragSrcEl = null;

    function handleDragStart(e) {
        this.style.opacity = '0.4';

        dragSrcEl = this;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }


    function handleDragOver(e) {
        if (e.preventDefault()) {
            e.preventDefault(); // allows us to drop
        }

        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    function handleDragEnter(e) {
        // this / e.target is the current hover target
        this.classList.add('over');
    }

    function handleDragLeave(e) {
        // this / e.target is the previous target element
        this.classList.remove('over');
    }

    function handleDrop(e) {
        if (e.stopPropagation()) {
            e.stopPropagation(); // stops the browser from redirecting
        }

        if (dragSrcEl != this) {
            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');
            this.parentNode.appendChild(dragSrcEl);
        }

        return false;
    }

    function handleDragEnd(e) {
        [].forEach.call(lis, function (li) {
            li.classList.remove('over');
        });
    }
})();