window.onload = function () {
    var buttons = document.querySelectorAll('.digit');
    var skipButton = document.querySelector('.skip');
    var summonButton = document.querySelector('.summon');
    var confirmationButton = document.querySelector('.confirmation');
    var initiativePreview = document.querySelector('.initiative-preview');
    var initiativeEntries = document.querySelector('.initiative-entries');
    var goBack = function () {
        buttons.forEach(function (button) {
            button.textContent = button.textContent[1];
        });
        document.querySelector('.skip').textContent = '';
    };
    buttons.forEach(function (clickedButton) {
        clickedButton.addEventListener('click', function () {
            var clickedText = clickedButton.textContent;
            if (clickedButton.textContent.length == 1) {
                buttons.forEach(function (button) {
                    button.textContent = clickedText + button.textContent;
                });
                document.querySelector('.skip').textContent = '<-';
            }
            else {
                var initiativeButton_1 = document.createElement('button');
                initiativeButton_1.innerText = clickedText;
                initiativeButton_1.addEventListener('click', function () {
                    initiativeButton_1.remove();
                });
                if (summonButton.classList.contains('active')) {
                    initiativeButton_1.classList.add('with-summon');
                }
                initiativeButton_1.classList;
                var initiative_1 = parseInt(clickedText);
                var next = Array.from(initiativePreview.childNodes).find(function (x) { return parseInt(x.textContent) > initiative_1; }) || null;
                initiativePreview.insertBefore(initiativeButton_1, next);
                summonButton.classList.remove('active');
                goBack();
            }
        });
    });
    skipButton.addEventListener('click', function () {
        switch (skipButton.textContent) {
            case '':
                break;
            case '<-':
                goBack();
                break;
        }
    });
    summonButton.addEventListener('click', function () {
        summonButton.classList.toggle('active');
    });
    confirmationButton.addEventListener('click', function () {
        Array.from(initiativePreview.children).forEach(function (previewEntry) {
            var initiativeEntry = document.createElement('li');
            initiativeEntry.innerText = previewEntry.textContent;
            initiativeEntries.appendChild(initiativeEntry);
        });
        while (initiativePreview.firstChild) {
            initiativePreview.removeChild(initiativePreview.firstChild);
        }
        initiativeEntries.children[0].classList.add('active');
        document.body.classList.add('combat-round');
    });
    initiativeEntries.addEventListener('click', function () {
        console.log('clicked');
        var activeIndex = Array.from(initiativeEntries.children).findIndex(function (x) { return x.classList.contains('active'); });
        initiativeEntries.children[activeIndex].classList.remove('active');
        if (activeIndex + 1 < initiativeEntries.children.length) {
            initiativeEntries.children[activeIndex + 1].classList.add('active');
        }
        else {
            while (initiativeEntries.firstChild) {
                initiativeEntries.removeChild(initiativeEntries.firstChild);
            }
            document.body.classList.remove('combat-round');
        }
    });
};
