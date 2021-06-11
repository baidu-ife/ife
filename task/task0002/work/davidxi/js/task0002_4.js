var elInput = $('#input');
var elOutput = $('#output');

/**
 * main class
 */
function AutoCompleteControls(elInput, elOutput) {
    this._elInput = elInput;
    this._elOutput = elOutput;

    var self = this;

    // init local data set
    this._data = [];
    _.each(usStates, function(item) {
        self._data.push(item.name);
    });

    $.on(this._elInput, 'input', function() {
        self.onQueryChange(self._elInput.value);
    });
    $.on(this._elInput, 'focus', function() {
        self.toggleModalVisible(true);
    });
    $.on(this._elInput, 'blur', function(event) {
        var target = event.relatedTarget;
        if (_.dom.isParentNode(target, self._elOutput)) {
            return;
        }
        self.toggleModalVisible(false);
    });
    $.on(this._elOutput, 'a', 'click', function(event) {
        self.onSelectResultRow(event, event.target);
    });
    $.on(this._elOutput, 'a', 'mouseover', function(event) {
        self.setFocusedRow(event.target);
    });
    $.on(document, 'keydown', function(event) {
        if (!self._isOpen) return;
        var keycode = event.keyCode;
        if (keycode === 13) {
            var current = self.getFocusedRow();
            if (current) {
                self.onSelectResultRow(event, current);
            }
            event.preventDefault();
        }
        if (keycode === 38) {
            self.selectRowByCursor(-1);
        }
        if (keycode === 40) {
            self.selectRowByCursor(1);
        }

    });
}

AutoCompleteControls.prototype.clearFocusedRow = function() {
    var previous = _.dom.query('.active', this._elOutput);
    _.each(previous, function(row) {
        _.dom.removeClass(row, 'active');
    });
};

AutoCompleteControls.prototype.getFocusedRow = function() {
    var row = _.dom.query('.active', this._elOutput);
    return row.length ? row[0] : null;
};

AutoCompleteControls.prototype.setFocusedRow = function(row) {
    this.clearFocusedRow();
    if (row) {
        _.dom.addClass(row, 'active');
        return true;
    }
    return false;
};

AutoCompleteControls.prototype.selectRowByCursor = function(delta) {
    if (!delta) return;
    var allRow = _.dom.query('a', this._elOutput);
    // NodeList --> Array
    allRow = _.toArray(allRow);
    var len = allRow.length;
    if (!len) return;

    var current = this.getFocusedRow();
    var index;
    if (current) {
        index = _.indexOf(allRow, current);
    } else {
        index = delta > 0 ? (delta - 2) : (delta + 1);
    }
    index = (index + len + delta) % len;

    this.setFocusedRow(allRow[index]);
};

AutoCompleteControls.prototype.toggleModalVisible = function(bool) {
    this._elOutput.style.display = bool ? 'block' : 'none';
    this._isOpen = bool;
}

AutoCompleteControls.prototype.onQueryChange = function(query) {
    if (/^\s*$/.test(query)) {
        this.toggleModalVisible(false);
        return;
    }

    var self = this;

    this.search(query, function(matched) {
        if (query !== self._elInput.value) {
            return;
        }

        var rowHtml = [];
        _.each(matched, function(value) {
            rowHtml.push(_.tmpl('template', {label: value}));
        })
        self._elOutput.innerHTML = rowHtml.join('');
        self.toggleModalVisible(true);
    });
};

AutoCompleteControls.prototype.search = function(query, cb) {
    var matched = [];
    var re = new RegExp(_.escapeRegExp(query), 'i');
    _.each(this._data, function(name) {
        if (re.test(name)) {
            matched.push(name);
        }
    });
    cb(matched);
};

AutoCompleteControls.prototype.onSelectResultRow = function(event, row) {
    this._elInput.value = _.trim(row.innerHTML);
    this.toggleModalVisible(false);
    this.clearFocusedRow();
};

/**
 * init auto complete instance
 */
elInput.$autoComplete = new AutoCompleteControls(elInput, elOutput);