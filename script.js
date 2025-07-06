document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.nav-item.dropdown');
    const calculatorDisplay = document.getElementById('active-calculator');
    const previewArea = document.getElementById('preview-area');

    // Function to close all dropdowns
    function closeAllDropdowns() {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
            const content = dropdown.querySelector('.dropdown-content');
            if (content) {
                content.style.display = 'none'; // Ensure display none
            }
        });
    }

    // Toggle dropdown on click
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        if (dropbtn) {
            dropbtn.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent default link behavior
                event.stopPropagation(); // Stop propagation to prevent document click from closing immediately

                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                        const otherContent = otherDropdown.querySelector('.dropdown-content');
                        if (otherContent) {
                            otherContent.style.display = 'none';
                        }
                    }
                });

                // Toggle current dropdown
                dropdown.classList.toggle('active');
                const content = dropdown.querySelector('.dropdown-content');
                if (content) {
                    // Use display block/none for immediate toggle, CSS handles transitions
                    content.style.display = dropdown.classList.contains('active') ? 'block' : 'none';
                }
            });

            // Handle submenu hover (for desktop)
            const submenuHeader = dropdown.querySelector('.submenu-header');
            if (submenuHeader) {
                const submenuContent = submenuHeader.nextElementSibling; // Get the submenu-content div

                if (submenuContent) {
                    // Using mouseenter/mouseleave for hover effect on desktop
                    submenuHeader.addEventListener('mouseenter', () => {
                        submenuContent.style.display = 'block';
                    });
                    submenuHeader.addEventListener('mouseleave', () => {
                        // A small delay to allow cursor to enter submenu-content
                        setTimeout(() => {
                            if (!submenuContent.matches(':hover')) {
                                submenuContent.style.display = 'none';
                            }
                        }, 50);
                    });
                    submenuContent.addEventListener('mouseleave', () => {
                        submenuContent.style.display = 'none';
                    });
                }
            }
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.main-nav')) {
            closeAllDropdowns();
        }
    });

    // Calculator loading and preview logic
    const calculatorLinks = document.querySelectorAll('.dropdown-content a[data-calculator]');

    const calculatorData = {
        // Schools (K–12)
        'basic-calculator': {
            name: 'Basic Calculator',
            description: 'Performs simple arithmetic operations: addition, subtraction, multiplication, and division.',
            previewHtml: `
                <div class="calculator-preview-content">
                    <h4>Basic Calculator Preview</h4>
                    <p>Ideal for everyday calculations.</p>
                    <div class="calculator-basic-preview">
                        <div class="display">123</div>
                        <button>7</button><button>8</button><button>9</button><button class="operator">/</button>
                        <button>4</button><button>5</button><button>6</button><button class="operator">*</button>
                        <button>1</button><button>2</button><button>3</button><button class="operator">-</button>
                        <button class="clear">C</button><button>0</button><button class="equals">+</button>
                    </div>
                </div>
            `,
            fullHtml: `
                <div class="calculator-container calculator-basic">
                    <div class="display" id="basic-calc-display">0</div>
                    <button onclick="appendToDisplay('7')">7</button>
                    <button onclick="appendToDisplay('8')">8</button>
                    <button onclick="appendToDisplay('9')">9</button>
                    <button class="operator" onclick="appendToDisplay('/')">/</button>
                    <button onclick="appendToDisplay('4')">4</button>
                    <button onclick="appendToDisplay('5')">5</button>
                    <button onclick="appendToDisplay('6')">6</button>
                    <button class="operator" onclick="appendToDisplay('*')">*</button>
                    <button onclick="appendToDisplay('1')">1</button>
                    <button onclick="appendToDisplay('2')">2</button>
                    <button onclick="appendToDisplay('3')">3</button>
                    <button class="operator" onclick="appendToDisplay('-')">-</button>
                    <button class="clear" onclick="clearDisplay()">C</button>
                    <button onclick="appendToDisplay('0')">0</button>
                    <button onclick="appendToDisplay('.')">.</button>
                    <button class="operator" onclick="appendToDisplay('+')">+</button>
                    <button class="equals" onclick="calculateResult()">=</button>
                </div>
                <script>
                    let currentInput = '0';
                    let operator = null;
                    let previousInput = '';
                    const display = document.getElementById('basic-calc-display');

                    function updateDisplay() {
                        display.textContent = currentInput;
                    }

                    function appendToDisplay(num) {
                        if (currentInput === '0' && num !== '.') {
                            currentInput = num;
                        } else {
                            currentInput += num;
                        }
                        updateDisplay();
                    }

                    function clearDisplay() {
                        currentInput = '0';
                        operator = null;
                        previousInput = '';
                        updateDisplay();
                    }

                    function calculateResult() {
                        try {
                            currentInput = eval(currentInput).toString();
                            updateDisplay();
                        } catch (e) {
                            currentInput = 'Error';
                            updateDisplay();
                        }
                    }
                <\/script>
            `
        },
        'scientific-calculator': {
            name: 'Scientific Calculator',
            description: 'Handles exponents, roots, trigonometry (sin, cos, tan), logarithms, and basic statistical functions.',
            previewHtml: `
                <div class="calculator-preview-content">
                    <h4>Scientific Calculator Preview</h4>
                    <p>For high school math and science.</p>
                    <img src="https://via.placeholder.com/150x80?text=Scientific+Preview" alt="Scientific Calculator Preview">
                </div>
            `,
            fullHtml: `
                <div class="placeholder-calculator">
                    <h3>Scientific Calculator</h3>
                    <p>This calculator handles exponents, roots, trigonometry, logarithms, and basic statistical functions.</p>
                    <p><em>(Actual calculator logic for this type needs to be implemented here.)</em></p>
                </div>
            `
        },
        // Colleges and Universities
        'advanced-scientific-calculator': {
            name: 'Advanced Scientific Calculator',
            description: 'Extended functions—complex numbers, matrix calculations, calculus (derivatives, integrals).',
            previewHtml: `
                <div class="calculator-preview-content">
                    <h4>Advanced Scientific Calculator Preview</h4>
                    <p>Essential for engineering and advanced science.</p>
                    <img src="https://via.placeholder.com/150x80?text=Adv+Scientific+Preview" alt="Advanced Scientific Calculator Preview">
                </div>
            `,
            fullHtml: `
                <div class="placeholder-calculator">
                    <h3>Advanced Scientific Calculator</h3>
                    <p>Designed for engineering, science, and math majors requiring complex numbers, matrix calculations, and calculus functions.</p>
                    <p><em>(Actual calculator logic for this type needs to be implemented here.)</em></p>
                </div>
            `
        },
        'graphing-calculator': {
            name: 'Graphing Calculator',
            description: 'Plots graphs, solves equations, performs calculus and statistics functions.',
            previewHtml: `
                <div class="calculator-preview-content">
                    <h4>Graphing Calculator Preview</h4>
                    <p>Visualize functions and data.</p>
                    <img src="https://via.placeholder.com/150x80?text=Graphing+Preview" alt="Graphing Calculator Preview">
                </div>
            `,
            fullHtml: `
                <div class="placeholder-calculator">
                    <h3>Graphing Calculator</h3>
                    <p>Used for plotting graphs, solving equations, and advanced calculus and statistics in high school (AP/IB) and college.</p>
                    <p><em>(Actual calculator logic for this type needs to be implemented here.)</em></p>
                </div>
            `
        },
        'financial-college-calculator': {
            name: 'Financial Calculator',
            description: 'Calculates time value of money, interest rates, amortization, cash flows, IRR, NPV.',
            previewHtml: `
                <div class="calculator-preview-content">
                    <h4>Financial Calculator Preview</h4>
                    <p>For business and finance students.</p>
                    <img src="https://via.placeholder.com/150x80?text=Financial+Preview" alt="Financial Calculator Preview">
                </div>
            `,
            fullHtml: `
                <div class="placeholder-calculator">
                    <h3>Financial Calculator (College)</h3>
                    <p>A tool for business, finance, and economics students to analyze time value of money, interest rates, and investment metrics.</p>
                    <p><em>(Actual calculator logic for this type needs to be implemented here.)</em></p>
                </div>
            `
        },
        'statistical-software': {
            name: 'Statistical Calculator / Software',
            description: 'Performs hypothesis testing, regression analysis, and probability distributions. Often replaced by software.',
            previewHtml: `
                <div class="calculator-preview-content">
                    <h4>Statistical Tools Preview</h4>
                    <p>For data analysis and research.</p>
                    <img src="https://via.placeholder.com/150x80?text=Statistical+Preview" alt="Statistical Software Preview">
                </div>
            `,
            fullHtml: `
                <div class="placeholder-calculator">
                    <h3>Statistical Calculator / Software</h3>
                    <p>While often replaced by software like SPSS, R, or Excel, a calculator version would perform hypothesis testing, regression, and probability distributions.</p>
                    <p><em>(Actual calculator logic for this type needs to be implemented here.)</em></p>
                </div>
            `
        },
        // Industry and Professional Use
        'financial-business-calculator': {
            name: 'Financial and Business Calculators',
            description: 'Advanced financial calculations for investment banking, financial planning, and accounting.',
            previewHtml: `
                <div class="calculator-preview-content">
                    <h4>Financial & Business Calculator Preview</h4>
                    <p>For serious financial professionals.</p>
                    <img src="https://via.placeholder.com/150x80?text=Biz+Fin+Preview" alt="Financial & Business Calculator Preview">
                </div>
            `,
            fullHtml: `
                <div class="placeholder-calculator">
                    <h3>Financial and Business Calculators</h3>
                    <p>Used extensively in investment banking, financial planning, and accounting for complex financial modeling.</p>
                    <p><em>(Actual calculator logic for this type needs to be implemented here.)</em></p>
                </div>
            `
        },
        'engineering-calculator': {
            name: 'Engineering Calculators',
            description: 'Extensive functions including unit conversion, differential equations, Laplace transforms.',
            previewHtml: `
                <div class="calculator-preview-content">
                    <h4>Engineering Calculator Preview</h4>
                    <p>Power tools for engineers.</p>
                    <img src="https://via.placeholder.com/150x80?text=Eng+Calc+Preview" alt="Engineering Calculator Preview">
                </div>
            `,
            fullHtml: `
                <div class="placeholder-calculator">
                    <h3>Engineering Calculators</h3>
                    <p>Indispensable for civil, electrical, and mechanical engineering fields, offering functions like unit conversion, differential equations, and Laplace transforms.</p>
                    <p><em>(Actual calculator logic for this type needs to be implemented here.)</em></p>
                </div>
            `
        },
        'programmable-calculator': {
            name: 'Programmable Calculator',
            description: 'Allows users to write and store custom programs for repetitive or complex calculations.',
            previewHtml: `
                <div class="calculator-preview-content">
                    <h4>Programmable Calculator Preview</h4>
                    <p>Automate your complex calculations.</p>
                    <img src="https://via.placeholder.com/150x80?text=Programmable+Preview" alt="Programmable Calculator Preview">
                </div>
            `,
            fullHtml: `
                <div class="placeholder-calculator">
                    <h3>Programmable Calculator</h3>
                    <p>Favored by engineers, computer scientists, and researchers for writing and storing custom programs to automate repetitive calculations.</p>
                    <p><em>(Actual calculator logic for this type needs to be implemented here.)</em></p>
                </div>
            `
        },
        'construction-calculator': {
            name: 'Construction Calculators',
            description: 'Estimates area, volume, pitch, roofing, and materials.',
            previewHtml: `
                <div class="calculator-preview-content">
                    <h4>Construction Calculator Preview</h4>
                    <p>For builders and contractors.</p>
                    <img src="https://via.placeholder.com/150x80?text=Construction+Preview" alt="Construction Calculator Preview">
                </div>
            `,
            fullHtml: `
                <div class="placeholder-calculator">
                    <h3>Construction Calculators</h3>
                    <p>Essential for contractors, architects, and builders to estimate area, volume, pitch, roofing, and material quantities.</p>
                    <p><em>(Actual calculator logic for this type needs to be implemented here.)</em></p>
                </div>
            `
        },
        'medical-calculator': {
            name: 'Medical Calculators',
            description: 'Calculates drug dosage, BMI, infusion rates, etc.',
            previewHtml: `
                <div class="calculator-preview-content">
                    <h4>Medical Calculator Preview</h4>
                    <p>Precision for healthcare professionals.</p>
                    <img src="https://via.placeholder.com/150x80?text=Medical+Preview" alt="Medical Calculator Preview">
                </div>
            `,
            fullHtml: `
                <div class="placeholder-calculator">
                    <h3>Medical Calculators</h3>
                    <p>Specialized tools for healthcare professionals to calculate drug dosages, BMI, infusion rates, and more.</p>
                    <p><em>(Actual calculator logic for this type needs to be implemented here.)</em></p>
                </div>
            `
        },
        'statistical-actuarial-calculator': {
            name: 'Statistical/Actuarial Calculators',
            description: 'Calculates mortality rates, premium estimations, and other actuarial science metrics.',
            previewHtml: `
                <div class="calculator-preview-content">
                    <h4>Statistical/Actuarial Calculator Preview</h4>
                    <p>For risk assessment and insurance.</p>
                    <img src="https://via.placeholder.com/150x80?text=Actuarial+Preview" alt="Statistical/Actuarial Calculator Preview">
                </div>
            `,
            fullHtml: `
                <div class="placeholder-calculator">
                    <h3>Statistical/Actuarial Calculators</h3>
                    <p>Used for complex statistical analysis and actuarial science, including mortality rate calculations and premium estimations.</p>
                    <p><em>(Actual calculator logic for this type needs to be implemented here.)</em></p>
                </div>
            `
        },
        'chemistry-calculator': {
            name: 'Chemistry Calculators',
            description: 'Calculates molar mass, reaction yield, stoichiometry, etc.',
            previewHtml: `
                <div class="calculator-preview-content">
                    <h4>Chemistry Calculator Preview</h4>
                    <p>Solve chemical equations.</p>
                    <img src="https://via.placeholder.com/150x80?text=Chemistry+Preview" alt="Chemistry Calculator Preview">
                </div>
            `,
            fullHtml: `
                <div class="placeholder-calculator">
                    <h3>Chemistry Calculators</h3>
                    <p>Tools for chemists to calculate molar mass, reaction yield, stoichiometry, and other chemical properties.</p>
                    <p><em>(Actual calculator logic for this type needs to be implemented here.)</em></p>
                </div>
            `
        },
        'astronomical-calculator': {
            name: 'Astronomical Calculators',
            description: 'Calculates orbital periods, luminosity, celestial coordinates, etc.',
            previewHtml: `
                <div class="calculator-preview-content">
                    <h4>Astronomical Calculator Preview</h4>
                    <p>Explore the cosmos with calculations.</p>
                    <img src="https://via.placeholder.com/150x80?text=Astronomical+Preview" alt="Astronomical Calculator Preview">
                </div>
            `,
            fullHtml: `
                <div class="placeholder-calculator">
                    <h3>Astronomical Calculators</h3>
                    <p>Specialized calculators for astronomers and enthusiasts to compute orbital periods, luminosity, celestial coordinates, and more.</p>
                    <p><em>(Actual calculator logic for this type needs to be implemented here.)</em></p>
                </div>
            `
        },
    };

    calculatorLinks.forEach(link => {
        const calculatorId = link.dataset.calculator;
        const data = calculatorData[calculatorId];

        // Add hover effect for preview
        link.addEventListener('mouseenter', () => {
            if (data && data.previewHtml) {
                previewArea.innerHTML = data.previewHtml;
            } else {
                previewArea.innerHTML = `<div class="preview-content"><h4>Preview Not Available</h4><p>No specific preview content defined for ${data ? data.name : 'this calculator'}.</p></div>`;
            }
        });

        // Clear preview on mouse leave
        link.addEventListener('mouseleave', () => {
            previewArea.innerHTML = `<div>Hover over a calculator type to see its preview here.</div>`;
        });


        // Add click effect to load full calculator
        link.addEventListener('click', (event) => {
            event.preventDefault();
            closeAllDropdowns(); // Close dropdown after selection
            if (data && data.fullHtml) {
                calculatorDisplay.innerHTML = data.fullHtml;
                // Execute any scripts loaded with the HTML (e.g., for the basic calculator)
                const scripts = calculatorDisplay.querySelectorAll('script');
                scripts.forEach(oldScript => {
                    const newScript = document.createElement('script');
                    Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                    newScript.textContent = oldScript.textContent;
                    oldScript.parentNode.replaceChild(newScript, oldScript);
                });

                // Scroll to the calculator display section
                calculatorDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });

            } else {
                calculatorDisplay.innerHTML = `
                    <div class="placeholder-calculator">
                        <h3>Calculator Not Available</h3>
                        <p>The full interface for ${data ? data.name : 'this calculator'} is not yet implemented.</p>
                    </div>
                `;
            }
        });
    });

    // Initialize preview area text
    previewArea.innerHTML = `<div>Hover over a calculator type to see its preview here.</div>`;
});
