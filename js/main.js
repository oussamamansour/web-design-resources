/*

fonts
colors
icons
tools
images
useful websites

roadmap
best tools (browser, code editor, ide)
courses
books

*/

var actionBtn = document.querySelector('.action-btn'),
    fontGeneratorField = document.querySelector('.font-generator-field'),
    fontGeneratorBtn = document.querySelector('.font-generator-btn'),
    fontsWrapper = document.querySelector('.fonts-wrapper'),
    textOutput = document.querySelector('.text-output'),
    fonts = document.querySelectorAll('.font'),
    clearFieldBtn = document.querySelector('.clear-field-btn'),
    i = 0,
    textDir = 'ltr',
    colors = document.querySelectorAll('.color'),
    colorChosen = document.querySelector('.color-chosen'),
    colorChosenValue = document.querySelector('.color-chosen-value'),
    colorCategories = document.querySelectorAll('.color-category'),
    allColorsShades = document.querySelectorAll('.color'),
    privacyCardWrapper = document.querySelector('.privacy-card-wrapper'),
    privacyCard = document.querySelector('.privacy-card'),
    privacyInfoBtns = document.querySelectorAll('.privacy-info-btn'),
    privacyCardBtns = document.querySelectorAll('.privacy-card-category-btn'),
    privacyCardTexts = document.querySelectorAll('.privacy-card-text'),
    privacyCardAcceptBtn = document.querySelector('.privacy-card-accept-btn'),
    privacyCardReadAcceptBtn = document.querySelector('.privacy-card-read-text-btn'),
    privacyCardCurrentTextIndex = 0;
    

function niceScrollSetup(element, color) {
    $(element).niceScroll({
        cursorcolor: color,
        cursorwidth: "1.5rem",
        cursorborder: "none",
        cursorborderradius: "0",
        scrollspeed: 50,
        railpadding: { top: 0, right: 0, left: 0, bottom: 0 },
        sensitiverail: true,
        enablemousewheel:true,
        horizrailenabled: false,
        cursorborderradius: ".8rem",
        zindex:"50"
    });
}
niceScrollSetup(document.body,"#FFCC00");

// Go back to top button
document.querySelector('.scroll-top').addEventListener('click', () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
})

var scrollTopBtn = $('.scroll-top');
$(window).scroll(function() {
    if ($(window).scrollTop() > 500) {
        scrollTopBtn.addClass('show');
    } else {
        scrollTopBtn.removeClass('show');
    }
});
var scrollToMain = new SmoothScroll('.action-btn, .navbar-list-item-link', {
    speed:500,
    offset:90
});

var navbar = $('nav');
$(window).scroll(function() {
    if ($(window).scrollTop() > 100) {
        navbar.addClass('scroll');
    } else {
        navbar.removeClass('scroll');
    }
});

//    document.querySelector('.privacy-card-wrapper').addEventListener('focusout', (btn) => {
//   btn.classList.add('hidden');
//   console.log(1);
//})

// Toggle fonts card 
fontGeneratorBtn.addEventListener('click', () => {
    var fontGeneratorBtnRole = fontGeneratorBtn.getAttribute('data-btn-role');

    if (fontGeneratorBtnRole == 'done') {
        fontGeneratorBtn.innerHTML = 'Done?';
        fontGeneratorBtn.setAttribute('data-btn-role', 'choose');
        fontsWrapper.classList.remove('hidden');
    
    } else if (fontGeneratorBtnRole == 'choose') {
        fontGeneratorBtn.innerHTML = 'Choose a font!';
        fontGeneratorBtn.setAttribute('data-btn-role', 'done');
        fontsWrapper.classList.add('hidden');

    }
})
function outputText() {
    if(fontGeneratorField.value == '') {
        if (textDir == 'ltr') {
            textOutput.innerHTML = 'This is some really cool text'
        } else if (textDir == 'rtl') {
            textOutput.innerHTML = 'هذا النص هو عبارة عن نص مثال'
        }
        clearFieldBtn.setAttribute('disabled','')
    } else {
        textOutput.innerHTML = fontGeneratorField.value;
        clearFieldBtn.removeAttribute('disabled')
    }
}

// Output text when user types in text
fontGeneratorField.addEventListener('keyup', outputText);

// Select font 
fonts.forEach((font) => {
    font.addEventListener('click', () => {
        if (font.classList.contains('arabic')) {
            textDir = 'rtl';
            fontGeneratorField.placeholder = 'قم بإدخال نص رائع..'
            
        } else {
            textDir = 'ltr';
            fontGeneratorField.placeholder = 'Type some cool text...'
        }
        fontGeneratorField.dir = textDir;
        textOutput.dir = textDir;

        // Update the output text
        outputText();
        
        // Remove active class from all fonts elements
        fonts.forEach((font) => {
            font.classList.remove('active');
        })
        // Add active class
        font.classList.add('active');
        // Remove recent font class
        textOutput.classList.toggle(textOutput.classList[1]);
        // Add new font class
        textOutput.classList.add(font.classList[1]);

    })
})

// Clear font generator input
clearFieldBtn.addEventListener('click', () => {
    if (fontGeneratorField.value !== '') {
        fontGeneratorField.value = '';
        outputText();    
    }
    fontGeneratorField.focus();

})

// Show selected color and copy its value to clipboard
colors.forEach((color) => {
    color.addEventListener('click', () => {
        var rgbColor = window.getComputedStyle(color).getPropertyValue('background-color');
        var hexColorArray, hexColor, greyValue;

        // Convert RGB color to HEX
        function rgbToHEX(r,g,b) {
            function evalHEX(x) {
                x = x.toString(16).toUpperCase();
                if (x.length == 1) { return x = '0' + x }
                return x
            }
            return (evalHEX(r) + evalHEX(g) + evalHEX(b))
        }

        // Extract rgb color values from string
        hexColorArray = rgbColor.substr(4).split(')')[0].split(',');

        hexColorArray.forEach((color, index) => {
            hexColorArray[index] = parseInt(color);
        })
        hexColor = rgbToHEX.apply(null, hexColorArray)

        // Change the color of the colorChosen box to either black or white depending on the chosen color
        greyValue = hexColorArray[0]*0.299 + hexColorArray[1]*0.587 + hexColorArray[2]*0.114;
        if (greyValue > 120) { //186
            colorChosen.style.color = '#000';
        } else {
            colorChosen.style.color = '#fff';
        }
        
        // Set color box background color and value
        colorChosen.innerHTML = color.classList[1] + ': #' + hexColor;
        colorChosen.style.backgroundColor = '#' + hexColor;

        // Copy color value to clipboard
        ///colorChosenValue.value = hexColor;
        ///colorChosenValue.select();
        ///document.execCommand("copy")
        navigator.clipboard.writeText(hexColor);

    })
})

// Show color group based on category
colorCategories.forEach(colorCategory => {
    var currentColor, colorShades;

    colorCategory.addEventListener('click', item => {
    
        // Add active class to chosen color
        colorCategories.forEach(colorCateg => {
            colorCateg.classList.remove('active')
        })
        colorCategory.classList.add('active');

        // Show chosen color shades
        currentColor = colorCategory.getAttribute('data-color');
        colorShades = document.querySelectorAll('.color[data-color=' + currentColor + ']')
        
        allColorsShades.forEach(colorShade => {
            colorShade.classList.add('hidden')
        })
        colorShades.forEach(colorShade => {
            colorShade.classList.remove('hidden')
        })
    })

})
// Enable action button when user scrolls to the end of the page
privacyCardTexts.forEach(privacyCardText => {
    var element;
    privacyCardText.addEventListener('scroll', function(e){
        element = e.target;

        // Element full height - scrolled height = visible element height (interval of error is 1)
        if ((element.scrollHeight - Math.ceil(element.scrollTop) - element.clientHeight) in [0,1]) {
            
            // Show the action button
            privacyCardAcceptBtn.classList.add('bottom-reached');

            privacyCardAcceptBtn.addEventListener('click', () => {
                console.log(2);
                if (privacyCardAcceptBtn.classList.contains('bottom-reached')) {
                    hidePrivacyCardSetup();
                }
            }, { once:true })
        } else {
            // Hide the action button
            privacyCardAcceptBtn.classList.remove('bottom-reached');
        }
    });
})
function hidePrivacyCardSetup() {
    // Add nicescroll on body
    niceScrollSetup(document.body,"#FFCC00")
    
    // Remove nicescroll from privacy card
    $(privacyCardTexts).each(function(i) {
        $($(this)).getNiceScroll().remove();
    });
    
    // Hide privacy card
    privacyCard.classList.add('hidden');

}

function clickOutsidePrivacyCardFn(e) {
    clickOutsidePrivacyCard(e);
}
function clickOutsidePrivacyCard(e) {
    console.log(e.target);
    if (e.target.closest('.privacy-card-wrapper') != privacyCardWrapper) {
        hidePrivacyCardSetup();
        console.log(i++);
        privacyCard.removeEventListener("click",clickOutsidePrivacyCardFn);

    }
}

function scrollToTopTextWrapper() {
    // Remove active class on action button
    privacyCardAcceptBtn.classList.remove('bottom-reached');

    privacyCardTexts.forEach(el => {
        el.scrollTo(0, 0);
    });
}
function showCurrentPrivacyCard(privacyCardCategory) {
    var index1, index2;

    // Show the selected section
    switch (privacyCardCategory) {
        case 'terms-of-service':
            index1 = 0;
            index2 = 1;
            break;
        case 'privacy-policy':
            index2 = 0;
            index1 = 1;
            break;
    }
    privacyCardTexts[index1].classList.remove('hidden');
    privacyCardTexts[index2].classList.add('hidden');

    // Set active class to the current category
    privacyCardBtns.forEach(element => {
        element.classList.remove('active');
    })
    privacyCardBtns[index1].classList.add('active');
 
    // Scroll to top 
    scrollToTopTextWrapper();

}
// TOGGLE PRIVACY INFO
privacyInfoBtns.forEach(item => {
    var privacyCardCategory;

    item.addEventListener('click', () => {
        privacyCardCategory = item.getAttribute('data-btn-role');

        // Remove nicescroll from body
        $("body").getNiceScroll().remove();
 
        // Show privacy card
        privacyCard.classList.remove('hidden');
        var i=0;

        privacyCard.addEventListener("click",clickOutsidePrivacyCardFn);

        // Show current privacy category
        showCurrentPrivacyCard(privacyCardCategory);

        // Add nicescroll on privacy card
        $(privacyCardTexts).each((i,item) => {
            niceScrollSetup(item,"#282C34");
        });

        // Scroll to the bottom of the text wrapper when clicking button
        privacyCardReadAcceptBtn.addEventListener('click', () => {
            privacyCardTexts.forEach(privacyCardText => {
                var scrollHeight = privacyCardText.scrollHeight - privacyCardText.clientHeight;
                $(privacyCardText).getNiceScroll(0).doScrollTop(scrollHeight,0);
            })
        })
       
        // Add event listeners to privacy card btns
        privacyCardBtns.forEach(el => {
            var privacyBtnCategory = el.getAttribute('data-btn-role');
            
            el.addEventListener('click', () => {
                // Show current privacy category
                showCurrentPrivacyCard(privacyBtnCategory);
           })
        })

    })
})


