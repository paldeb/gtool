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
        // Updated Financial Calculators for Colleges and Universities
        'financial-college-calculator': { // This will now be a main menu item with sub-calculators
            name: 'Financial Calculators',
            description: 'A suite of calculators for college students focusing on various financial aspects.',
            previewHtml: `
                <div class="calculator-preview-content">
                    <h4>Financial Calculators Suite</h4>
                    <p>Explore tools for loans, investments, savings, and more.</p>
                    <img src="https://via.placeholder.com/150x80?text=Financial+Suite+Preview" alt="Financial Calculators Suite Preview">
                </div>
            `,
            fullHtml: `
                <div class="placeholder-calculator">
                    <h3>Financial Calculators (College)</h3>
                    <p>Please select a specific financial calculator from the dropdown menu.</p>
                    <p><em>(The selected financial calculator will appear here.)</em></p>
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
        // Financial & Business Calculators will also be a main menu item with sub-calculators
        'financial-business-calculator': {
            name: 'Financial & Business Calculators',
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
                    <p>Please select a specific business or financial calculator from the dropdown menu.</p>
                    <p><em>(The selected business/financial calculator will appear here.)</em></p>
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

        // --- Financial Calculator Sub-categories (New Additions) ---

        // Loan Calculators
        'emi-calculator': {
            name: 'EMI (Equated Monthly Installment) Calculator',
            description: 'Calculates the EMI for loans based on principal, interest rate, and tenure.',
            previewHtml: `<div class="calculator-preview-content"><h4>EMI Calculator Preview</h4><p>Estimate your monthly loan payments.</p><img src="https://via.placeholder.com/150x80?text=EMI+Preview" alt="EMI Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>EMI (Equated Monthly Installment) Calculator</h3><p>Input principal amount, interest rate, and loan tenure to calculate your EMI.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'auto-loan-calculator': {
            name: 'Auto Loan Calculator',
            description: 'Estimates car loan payments, total interest, and amortization schedule.',
            previewHtml: `<div class="calculator-preview-content"><h4>Auto Loan Calculator Preview</h4><p>Plan your car purchase finances.</p><img src="https://via.placeholder.com/150x80?text=Auto+Loan+Preview" alt="Auto Loan Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Auto Loan Calculator</h3><p>Calculate your monthly payments for a car loan.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'home-loan-mortgage-calculator': {
            name: 'Home Loan / Mortgage Calculator',
            description: 'Calculates mortgage payments, interest over the loan term, and helps with affordability.',
            previewHtml: `<div class="calculator-preview-content"><h4>Home Loan Calculator Preview</h4><p>Understand your mortgage payments.</p><img src="https://via.placeholder.com/150x80?text=Mortgage+Preview" alt="Home Loan / Mortgage Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Home Loan / Mortgage Calculator</h3><p>Determine your potential home loan payments and amortization.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'personal-loan-calculator': {
            name: 'Personal Loan Calculator',
            description: 'Estimates monthly payments for personal loans.',
            previewHtml: `<div class="calculator-preview-content"><h4>Personal Loan Calculator Preview</h4><p>Figure out your personal loan EMIs.</p><img src="https://via.placeholder.com/150x80?text=Personal+Loan+Preview" alt="Personal Loan Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Personal Loan Calculator</h3><p>Calculate the monthly payments for a personal loan.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'loan-affordability-calculator': {
            name: 'Loan Affordability Calculator',
            description: 'Helps determine how much loan you can afford based on your income and expenses.',
            previewHtml: `<div class="calculator-preview-content"><h4>Loan Affordability Calculator Preview</h4><p>See how much you can borrow.</p><img src="https://via.placeholder.com/150x80?text=Affordability+Preview" alt="Loan Affordability Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Loan Affordability Calculator</h3><p>Determine the maximum loan amount you can afford based on your financial situation.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'loan-comparison-calculator': {
            name: 'Loan Comparison Calculator',
            description: 'Compares different loan offers side-by-side to find the best option.',
            previewHtml: `<div class="calculator-preview-content"><h4>Loan Comparison Calculator Preview</h4><p>Compare loan offers easily.</p><img src="https://via.placeholder.com/150x80?text=Loan+Comp+Preview" alt="Loan Comparison Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Loan Comparison Calculator</h3><p>Compare various loan options to find the best fit for your needs.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'prepayment-extra-payment-calculator': {
            name: 'Prepayment/Extra Payment Calculator',
            description: 'Shows how extra payments can reduce loan tenure and total interest paid.',
            previewHtml: `<div class="calculator-preview-content"><h4>Prepayment Calculator Preview</h4><p>Save money by paying early.</p><img src="https://via.placeholder.com/150x80?text=Prepay+Preview" alt="Prepayment/Extra Payment Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Prepayment/Extra Payment Calculator</h3><p>See how making extra payments can reduce your loan tenure and total interest.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'refinance-calculator': {
            name: 'Refinance Calculator',
            description: 'Helps decide if refinancing a loan makes financial sense.',
            previewHtml: `<div class="calculator-preview-content"><h4>Refinance Calculator Preview</h4><p>Evaluate your refinancing options.</p><img src="https://via.placeholder.com/150x80?text=Refinance+Preview" alt="Refinance Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Refinance Calculator</h3><p>Assess the benefits and costs of refinancing your existing loan.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },

        // Investment Calculators
        'sip-calculator': {
            name: 'SIP Calculator (Systematic Investment Plan)',
            description: 'Estimates the future value of your SIP investments.',
            previewHtml: `<div class="calculator-preview-content"><h4>SIP Calculator Preview</h4><p>Plan your systematic investments.</p><img src="https://via.placeholder.com/150x80?text=SIP+Preview" alt="SIP Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>SIP Calculator (Systematic Investment Plan)</h3><p>Calculate the future value of your Systematic Investment Plan.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'lumpsum-investment-calculator': {
            name: 'Lumpsum Investment Calculator',
            description: 'Calculates the future value of a one-time lump sum investment.',
            previewHtml: `<div class="calculator-preview-content"><h4>Lumpsum Investment Calculator Preview</h4><p>Project your one-time investment growth.</p><img src="https://via.placeholder.com/150x80?text=Lumpsum+Preview" alt="Lumpsum Investment Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Lumpsum Investment Calculator</h3><p>Estimate the growth of a single lump sum investment over time.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'stock-return-calculator': {
            name: 'Stock Return Calculator (CAGR, Absolute)',
            description: 'Calculates absolute and CAGR returns for stock investments.',
            previewHtml: `<div class="calculator-preview-content"><h4>Stock Return Calculator Preview</h4><p>Analyze your stock performance.</p><img src="https://via.placeholder.com/150x80?text=Stock+Return+Preview" alt="Stock Return Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Stock Return Calculator (CAGR, Absolute)</h3><p>Calculate your stock investment returns, including CAGR and absolute returns.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'mutual-fund-return-calculator': {
            name: 'Mutual Fund Return Calculator',
            description: 'Estimates returns from mutual fund investments.',
            previewHtml: `<div class="calculator-preview-content"><h4>Mutual Fund Return Calculator Preview</h4><p>Assess your mutual fund gains.</p><img src="https://via.placeholder.com/150x80?text=Mutual+Fund+Preview" alt="Mutual Fund Return Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Mutual Fund Return Calculator</h3><p>Calculate the returns from your mutual fund investments.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'bond-yield-calculator': {
            name: 'Bond Yield Calculator',
            description: 'Determines the yield to maturity (YTM) or current yield of a bond.',
            previewHtml: `<div class="calculator-preview-content"><h4>Bond Yield Calculator Preview</h4><p>Analyze bond returns.</p><img src="https://via.placeholder.com/150x80?text=Bond+Yield+Preview" alt="Bond Yield Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Bond Yield Calculator</h3><p>Determine the yield of your bond investments.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'portfolio-growth-calculator': {
            name: 'Portfolio Growth Calculator',
            description: 'Projects the future growth of an investment portfolio.',
            previewHtml: `<div class="calculator-preview-content"><h4>Portfolio Growth Calculator Preview</h4><p>Forecast your portfolio's future value.</p><img src="https://via.placeholder.com/150x80?text=Portfolio+Growth+Preview" alt="Portfolio Growth Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Portfolio Growth Calculator</h3><p>Project the growth of your investment portfolio over time.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'dividend-calculator': {
            name: 'Dividend Calculator',
            description: 'Calculates expected dividends based on shares and dividend yield.',
            previewHtml: `<div class="calculator-preview-content"><h4>Dividend Calculator Preview</h4><p>Estimate your dividend income.</p><img src="https://via.placeholder.com/150x80?text=Dividend+Preview" alt="Dividend Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Dividend Calculator</h3><p>Calculate your potential dividend income from stocks.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'capital-gains-tax-calculator-investment': {
            name: 'Capital Gains Tax Calculator',
            description: 'Estimates capital gains tax on investments.',
            previewHtml: `<div class="calculator-preview-content"><h4>Capital Gains Tax (Investment) Preview</h4><p>Estimate taxes on your investment gains.</p><img src="https://via.placeholder.com/150x80?text=CGT+Invest+Preview" alt="Capital Gains Tax Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Capital Gains Tax Calculator (Investment)</h3><p>Estimate the capital gains tax payable on your investment profits.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'dollar-cost-averaging-calculator': {
            name: 'Dollar-Cost Averaging Calculator',
            description: 'Illustrates the benefits of dollar-cost averaging strategy.',
            previewHtml: `<div class="calculator-preview-content"><h4>Dollar-Cost Averaging Preview</h4><p>See the benefits of regular investing.</p><img src="https://via.placeholder.com/150x80?text=DCA+Preview" alt="Dollar-Cost Averaging Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Dollar-Cost Averaging Calculator</h3><p>Illustrate how dollar-cost averaging can smooth out investment volatility.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },

        // Savings Calculators
        'future-value-of-savings': {
            name: 'Future Value of Savings',
            description: 'Calculates the future value of a series of savings deposits.',
            previewHtml: `<div class="calculator-preview-content"><h4>Future Value of Savings Preview</h4><p>Project your savings growth.</p><img src="https://via.placeholder.com/150x80?text=Future+Savings+Preview" alt="Future Value of Savings Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Future Value of Savings</h3><p>Calculate how much your regular savings will be worth in the future.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'recurring-deposit-calculator': {
            name: 'Recurring Deposit Calculator',
            description: 'Estimates the maturity value of a recurring deposit.',
            previewHtml: `<div class="calculator-preview-content"><h4>Recurring Deposit Calculator Preview</h4><p>Estimate your RD maturity.</p><img src="https://via.placeholder.com/150x80?text=RD+Preview" alt="Recurring Deposit Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Recurring Deposit Calculator</h3><p>Calculate the maturity value for your recurring deposits.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'compound-interest-calculator': {
            name: 'Compound Interest Calculator',
            description: 'Shows how compound interest grows your money over time.',
            previewHtml: `<div class="calculator-preview-content"><h4>Compound Interest Calculator Preview</h4><p>See the power of compounding.</p><img src="https://via.placeholder.com/150x80?text=Compound+Interest+Preview" alt="Compound Interest Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Compound Interest Calculator</h3><p>Understand how compound interest makes your money grow faster.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'simple-interest-calculator': {
            name: 'Simple Interest Calculator',
            description: 'Calculates simple interest earned or paid.',
            previewHtml: `<div class="calculator-preview-content"><h4>Simple Interest Calculator Preview</h4><p>Basic interest calculation.</p><img src="https://via.placeholder.com/150x80?text=Simple+Interest+Preview" alt="Simple Interest Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Simple Interest Calculator</h3><p>Calculate simple interest earned on an investment or paid on a loan.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'emergency-fund-calculator': {
            name: 'Emergency Fund Calculator',
            description: 'Helps determine the ideal size for an emergency fund.',
            previewHtml: `<div class="calculator-preview-content"><h4>Emergency Fund Calculator Preview</h4><p>Secure your financial future.</p><img src="https://via.placeholder.com/150x80?text=Emergency+Fund+Preview" alt="Emergency Fund Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Emergency Fund Calculator</h3><p>Determine how much you need for your emergency fund.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'savings-goal-tracker': {
            name: 'Savings Goal Tracker',
            description: 'Tracks progress towards a specific savings goal.',
            previewHtml: `<div class="calculator-preview-content"><h4>Savings Goal Tracker Preview</h4><p>Stay on track with your goals.</p><img src="https://via.placeholder.com/150x80?text=Savings+Goal+Preview" alt="Savings Goal Tracker Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Savings Goal Tracker</h3><p>Track your progress towards achieving specific savings goals.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },

        // Retirement Calculators
        'retirement-corpus-calculator': {
            name: 'Retirement Corpus Calculator',
            description: 'Estimates the corpus needed for a comfortable retirement.',
            previewHtml: `<div class="calculator-preview-content"><h4>Retirement Corpus Calculator Preview</h4><p>Plan for your retirement nest egg.</p><img src="https://via.placeholder.com/150x80?text=Retirement+Corpus+Preview" alt="Retirement Corpus Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Retirement Corpus Calculator</h3><p>Estimate the total amount of money you will need for a comfortable retirement.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        '401k-growth-calculator': {
            name: '401(k) Growth Calculator',
            description: 'Projects the growth of a 401(k) retirement account.',
            previewHtml: `<div class="calculator-preview-content"><h4>401(k) Growth Calculator Preview</h4><p>Forecast your 401(k) growth.</p><img src="https://via.placeholder.com/150x80?text=401k+Preview" alt="401(k) Growth Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>401(k) Growth Calculator</h3><p>Project the growth of your 401(k) retirement savings over time.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'ira-calculator': {
            name: 'IRA (Traditional/Roth) Calculator',
            description: 'Helps compare and plan for Traditional and Roth IRA contributions and growth.',
            previewHtml: `<div class="calculator-preview-content"><h4>IRA Calculator Preview</h4><p>Plan your IRA contributions.</p><img src="https://via.placeholder.com/150x80?text=IRA+Preview" alt="IRA (Traditional/Roth) Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>IRA (Traditional/Roth) Calculator</h3><p>Compare and plan your contributions to Traditional and Roth IRAs.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'pension-calculator': {
            name: 'Pension Calculator',
            description: 'Estimates future pension payouts.',
            previewHtml: `<div class="calculator-preview-content"><h4>Pension Calculator Preview</h4><p>Estimate your future pension.</p><img src="https://via.placeholder.com/150x80?text=Pension+Preview" alt="Pension Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Pension Calculator</h3><p>Estimate your future pension payouts based on your service and salary.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'annuity-calculator': {
            name: 'Annuity Calculator',
            description: 'Calculates annuity payments or the lump sum needed for a desired annuity income.',
            previewHtml: `<div class="calculator-preview-content"><h4>Annuity Calculator Preview</h4><p>Plan your guaranteed income stream.</p><img src="https://via.placeholder.com/150x80?text=Annuity+Preview" alt="Annuity Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Annuity Calculator</h3><p>Calculate annuity payments or the lump sum required to achieve a desired income stream.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'social-security-estimator': {
            name: 'Social Security Estimator (US)',
            description: 'Estimates potential Social Security benefits based on earnings history (US-specific).',
            previewHtml: `<div class="calculator-preview-content"><h4>Social Security Estimator Preview</h4><p>Estimate your US Social Security benefits.</p><img src="https://via.placeholder.com/150x80?text=Social+Security+Preview" alt="Social Security Estimator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Social Security Estimator (US)</h3><p>Estimate your potential Social Security benefits based on your earnings history.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },

        // Budget and Expense Calculators
        'monthly-budget-planner': {
            name: 'Monthly Budget Planner',
            description: 'Helps create and track a monthly budget.',
            previewHtml: `<div class="calculator-preview-content"><h4>Monthly Budget Planner Preview</h4><p>Manage your monthly finances.</p><img src="https://via.placeholder.com/150x80?text=Budget+Planner+Preview" alt="Monthly Budget Planner Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Monthly Budget Planner</h3><p>Create and manage your monthly budget to track income and expenses.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'expense-split-calculator': {
            name: 'Expense Split Calculator',
            description: 'Divides shared expenses among multiple people.',
            previewHtml: `<div class="calculator-preview-content"><h4>Expense Split Calculator Preview</h4><p>Easily divide shared costs.</p><img src="https://via.placeholder.com/150x80?text=Expense+Split+Preview" alt="Expense Split Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Expense Split Calculator</h3><p>Divide shared expenses fairly among multiple individuals.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'zero-based-budget-calculator': {
            name: 'Zero-Based Budget Calculator',
            description: 'A tool for assigning every dollar a job (zero-based budgeting).',
            previewHtml: `<div class="calculator-preview-content"><h4>Zero-Based Budget Calculator Preview</h4><p>Give every dollar a purpose.</p><img src="https://via.placeholder.com/150x80?text=Zero+Budget+Preview" alt="Zero-Based Budget Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Zero-Based Budget Calculator</h3><p>Implement a zero-based budget where every dollar is assigned a purpose.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        '50-30-20-rule-calculator': {
            name: '50/30/20 Rule Calculator',
            description: 'Applies the 50/30/20 budgeting rule (Needs/Wants/Savings).',
            previewHtml: `<div class="calculator-preview-content"><h4>50/30/20 Rule Calculator Preview</h4><p>Simplify your budgeting.</p><img src="https://via.placeholder.com/150x80?text=50-30-20+Preview" alt="50/30/20 Rule Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>50/30/20 Rule Calculator</h3><p>Apply the popular 50/30/20 budgeting rule to your income.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'cash-flow-calculator': {
            name: 'Cash Flow Calculator',
            description: 'Analyzes inflows and outflows of cash over a period.',
            previewHtml: `<div class="calculator-preview-content"><h4>Cash Flow Calculator Preview</h4><p>Understand your money movement.</p><img src="https://via.placeholder.com/150x80?text=Cash+Flow+Preview" alt="Cash Flow Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Cash Flow Calculator</h3><p>Analyze your cash inflows and outflows to better understand your financial liquidity.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },

        // Tax Calculators
        'income-tax-calculator': {
            name: 'Income Tax Calculator',
            description: 'Estimates income tax based on salary, deductions, and tax slabs.',
            previewHtml: `<div class="calculator-preview-content"><h4>Income Tax Calculator Preview</h4><p>Estimate your annual income tax.</p><img src="https://via.placeholder.com/150x80?text=Income+Tax+Preview" alt="Income Tax Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Income Tax Calculator</h3><p>Estimate your income tax liability based on your income and applicable deductions.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'capital-gains-tax-calculator-general': { // Renamed to avoid clash with investment one
            name: 'Capital Gains Tax Calculator',
            description: 'Estimates capital gains tax on various assets.',
            previewHtml: `<div class="calculator-preview-content"><h4>Capital Gains Tax Preview</h4><p>Calculate tax on asset sales.</p><img src="https://via.placeholder.com/150x80?text=CGT+General+Preview" alt="Capital Gains Tax Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Capital Gains Tax Calculator</h3><p>Estimate the capital gains tax on the sale of various assets.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'gst-vat-calculator': {
            name: 'GST/VAT Calculator',
            description: 'Calculates GST/VAT amount and reverse calculates price from inclusive price.',
            previewHtml: `<div class="calculator-preview-content"><h4>GST/VAT Calculator Preview</h4><p>Calculate sales taxes.</p><img src="https://via.placeholder.com/150x80?text=GST+VAT+Preview" alt="GST/VAT Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>GST/VAT Calculator</h3><p>Calculate Goods and Services Tax (GST) or Value Added Tax (VAT) on transactions.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'self-employment-tax-estimator': {
            name: 'Self-Employment Tax Estimator',
            description: 'Estimates self-employment taxes for freelancers and small business owners.',
            previewHtml: `<div class="calculator-preview-content"><h4>Self-Employment Tax Preview</h4><p>Estimate your freelance taxes.</p><img src="https://via.placeholder.com/150x80?text=Self-Emp+Tax+Preview" alt="Self-Employment Tax Estimator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Self-Employment Tax Estimator</h3><p>Estimate your self-employment taxes, including Social Security and Medicare taxes.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'tax-withholding-estimator': {
            name: 'Tax Withholding Estimator (W-4 Tool for US)',
            description: 'Helps US taxpayers adjust their W-4 to optimize tax withholding.',
            previewHtml: `<div class="calculator-preview-content"><h4>Tax Withholding Estimator Preview</h4><p>Optimize your US tax withholding.</p><img src="https://via.placeholder.com/150x80?text=W-4+Preview" alt="Tax Withholding Estimator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Tax Withholding Estimator (W-4 Tool for US)</h3><p>Adjust your tax withholding to minimize your tax refund or amount due at tax time.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },

        // Business Finance Calculators
        'break-even-analysis': {
            name: 'Break-Even Analysis',
            description: 'Calculates the sales volume needed to cover all costs.',
            previewHtml: `<div class="calculator-preview-content"><h4>Break-Even Analysis Preview</h4><p>Find your profit point.</p><img src="https://via.placeholder.com/150x80?text=Break-Even+Preview" alt="Break-Even Analysis Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Break-Even Analysis</h3><p>Determine the point at which your business will cover all its costs and begin to make a profit.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'profit-margin-calculator': {
            name: 'Profit Margin Calculator',
            description: 'Calculates gross, operating, and net profit margins.',
            previewHtml: `<div class="calculator-preview-content"><h4>Profit Margin Calculator Preview</h4><p>Analyze your business profitability.</p><img src="https://via.placeholder.com/150x80?text=Profit+Margin+Preview" alt="Profit Margin Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Profit Margin Calculator</h3><p>Calculate various profit margins (gross, operating, net) for your business.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'markup-calculator': {
            name: 'Markup Calculator',
            description: 'Determines the selling price to achieve a desired markup percentage.',
            previewHtml: `<div class="calculator-preview-content"><h4>Markup Calculator Preview</h4><p>Set ideal product pricing.</p><img src="https://via.placeholder.com/150x80?text=Markup+Preview" alt="Markup Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Markup Calculator</h3><p>Determine the selling price of a product to achieve a desired markup percentage.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'operating-expense-ratio': {
            name: 'Operating Expense Ratio',
            description: 'Calculates the ratio of operating expenses to revenues.',
            previewHtml: `<div class="calculator-preview-content"><h4>Operating Expense Ratio Preview</h4><p>Assess business efficiency.</p><img src="https://via.placeholder.com/150x80?text=OER+Preview" alt="Operating Expense Ratio Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Operating Expense Ratio</h3><p>Calculate the ratio of your business's operating expenses to its revenue.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'working-capital-calculator': {
            name: 'Working Capital Calculator',
            description: 'Determines a company\'s short-term liquidity.',
            previewHtml: `<div class="calculator-preview-content"><h4>Working Capital Calculator Preview</h4><p>Measure business liquidity.</p><img src="https://via.placeholder.com/150x80?text=Working+Capital+Preview" alt="Working Capital Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Working Capital Calculator</h3><p>Determine your company's short-term liquidity and operational efficiency.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'inventory-turnover-calculator': {
            name: 'Inventory Turnover Calculator',
            description: 'Measures how many times inventory is sold and replaced over a period.',
            previewHtml: `<div class="calculator-preview-content"><h4>Inventory Turnover Preview</h4><p>Optimize your inventory management.</p><img src="https://via.placeholder.com/150x80?text=Inventory+Turnover+Preview" alt="Inventory Turnover Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Inventory Turnover Calculator</h3><p>Measure how efficiently your company manages its inventory.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },

        // Real Estate Calculators
        'mortgage-affordability-calculator': {
            name: 'Mortgage Affordability Calculator',
            description: 'Determines the maximum mortgage amount you can afford.',
            previewHtml: `<div class="calculator-preview-content"><h4>Mortgage Affordability Preview</h4><p>Find out how much home you can afford.</p><img src="https://via.placeholder.com/150x80?text=Mortgage+Afford+Preview" alt="Mortgage Affordability Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Mortgage Affordability Calculator</h3><p>Determine the maximum mortgage amount you can comfortably afford.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'rent-vs-buy-calculator': {
            name: 'Rent vs. Buy Calculator',
            description: 'Compares the financial implications of renting versus buying a home.',
            previewHtml: `<div class="calculator-preview-content"><h4>Rent vs. Buy Calculator Preview</h4><p>Make an informed housing decision.</p><img src="https://via.placeholder.com/150x80?text=Rent+Buy+Preview" alt="Rent vs. Buy Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Rent vs. Buy Calculator</h3><p>Compare the financial benefits and drawbacks of renting versus buying a home.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'property-tax-estimator': {
            name: 'Property Tax Estimator',
            description: 'Estimates annual property taxes based on property value and local rates.',
            previewHtml: `<div class="calculator-preview-content"><h4>Property Tax Estimator Preview</h4><p>Estimate your property taxes.</p><img src="https://via.placeholder.com/150x80?text=Property+Tax+Preview" alt="Property Tax Estimator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Property Tax Estimator</h3><p>Estimate your annual property taxes based on property value and local tax rates.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'home-equity-calculator': {
            name: 'Home Equity Calculator',
            description: 'Calculates the current equity in a home.',
            previewHtml: `<div class="calculator-preview-content"><h4>Home Equity Calculator Preview</h4><p>Discover your home's equity.</p><img src="https://via.placeholder.com/150x80?text=Home+Equity+Preview" alt="Home Equity Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Home Equity Calculator</h3><p>Calculate the current equity you have in your home.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'rental-yield-calculator': {
            name: 'Rental Yield Calculator',
            description: 'Determines the profitability of a rental property.',
            previewHtml: `<div class="calculator-preview-content"><h4>Rental Yield Calculator Preview</h4><p>Assess rental property profitability.</p><img src="https://via.placeholder.com/150x80?text=Rental+Yield+Preview" alt="Rental Yield Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Rental Yield Calculator</h3><p>Determine the profitability of a rental property investment.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'roi-property-investment': {
            name: 'ROI on Property Investment',
            description: 'Calculates the Return on Investment for a property.',
            previewHtml: `<div class="calculator-preview-content"><h4>ROI on Property Investment Preview</h4><p>Measure your property investment returns.</p><img src="https://via.placeholder.com/150x80?text=ROI+Property+Preview" alt="ROI on Property Investment Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>ROI on Property Investment</h3><p>Calculate the Return on Investment for your real estate property.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },

        // Credit and Debt Calculators
        'debt-payoff-calculator': {
            name: 'Debt Payoff Calculator (Avalanche/Snowball)',
            description: 'Helps plan debt repayment strategies using Avalanche or Snowball methods.',
            previewHtml: `<div class="calculator-preview-content"><h4>Debt Payoff Calculator Preview</h4><p>Strategize your debt freedom.</p><img src="https://via.placeholder.com/150x80?text=Debt+Payoff+Preview" alt="Debt Payoff Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Debt Payoff Calculator (Avalanche/Snowball)</h3><p>Plan your debt repayment strategy using the Avalanche or Snowball method.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'credit-card-interest-calculator': {
            name: 'Credit Card Interest Calculator',
            description: 'Estimates interest paid on credit card balances.',
            previewHtml: `<div class="calculator-preview-content"><h4>Credit Card Interest Calculator Preview</h4><p>Understand credit card costs.</p><img src="https://via.placeholder.com/150x80?text=CC+Interest+Preview" alt="Credit Card Interest Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Credit Card Interest Calculator</h3><p>Estimate the interest you will pay on your credit card balances.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'debt-to-income-ratio-calculator': {
            name: 'Debt-to-Income Ratio Calculator',
            description: 'Calculates DTI ratio, a key metric for loan approvals.',
            previewHtml: `<div class="calculator-preview-content"><h4>Debt-to-Income Ratio Preview</h4><p>Assess your financial health for loans.</p><img src="https://via.placeholder.com/150x80?text=DTI+Preview" alt="Debt-to-Income Ratio Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Debt-to-Income Ratio Calculator</h3><p>Calculate your Debt-to-Income (DTI) ratio, a key factor for loan approvals.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'minimum-payment-calculator': {
            name: 'Minimum Payment Calculator',
            description: 'Shows how long it takes to pay off debt making only minimum payments.',
            previewHtml: `<div class="calculator-preview-content"><h4>Minimum Payment Calculator Preview</h4><p>See the impact of minimum payments.</p><img src="https://via.placeholder.com/150x80?text=Min+Pay+Preview" alt="Minimum Payment Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Minimum Payment Calculator</h3><p>Discover how long it will take to pay off your debt by making only minimum payments.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'credit-score-impact-estimator': {
            name: 'Credit Score Impact Estimator',
            description: 'Estimates how financial actions might affect a credit score.',
            previewHtml: `<div class="calculator-preview-content"><h4>Credit Score Impact Estimator Preview</h4><p>Predict changes to your credit score.</p><img src="https://via.placeholder.com/150x80?text=Credit+Score+Preview" alt="Credit Score Impact Estimator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Credit Score Impact Estimator</h3><p>Estimate how various financial actions might impact your credit score.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },

        // Currency & Inflation Calculators
        'currency-converter': {
            name: 'Currency Converter',
            description: 'Converts amounts between different currencies.',
            previewHtml: `<div class="calculator-preview-content"><h4>Currency Converter Preview</h4><p>Convert currencies instantly.</p><img src="https://via.placeholder.com/150x80?text=Currency+Convert+Preview" alt="Currency Converter Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Currency Converter</h3><p>Convert amounts between different global currencies.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'inflation-adjustment-calculator': {
            name: 'Inflation Adjustment Calculator',
            description: 'Adjusts past or future values for inflation.',
            previewHtml: `<div class="calculator-preview-content"><h4>Inflation Adjustment Calculator Preview</h4><p>Account for changing money value.</p><img src="https://via.placeholder.com/150x80?text=Inflation+Preview" alt="Inflation Adjustment Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Inflation Adjustment Calculator</h3><p>Adjust past or future financial values to account for inflation.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'purchasing-power-calculator': {
            name: 'Purchasing Power Calculator',
            description: 'Shows how inflation erodes purchasing power over time.',
            previewHtml: `<div class="calculator-preview-content"><h4>Purchasing Power Calculator Preview</h4><p>Understand money's true value over time.</p><img src="https://via.placeholder.com/150x80?text=Purchasing+Power+Preview" alt="Purchasing Power Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Purchasing Power Calculator</h3><p>Illustrate how inflation affects the purchasing power of money over time.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'cost-of-living-comparison': {
            name: 'Cost of Living Comparison',
            description: 'Compares the cost of living between different cities or regions.',
            previewHtml: `<div class="calculator-preview-content"><h4>Cost of Living Comparison Preview</h4><p>Compare living expenses in different places.</p><img src="https://via.placeholder.com/150x80?text=COL+Compare+Preview" alt="Cost of Living Comparison Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Cost of Living Comparison</h3><p>Compare the cost of living between various cities or regions.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },

        // Education Planning Calculators
        'college-savings-calculator': {
            name: 'College Savings Calculator',
            description: 'Helps plan and project savings for college education.',
            previewHtml: `<div class="calculator-preview-content"><h4>College Savings Calculator Preview</h4><p>Plan for future education costs.</p><img src="https://via.placeholder.com/150x80?text=College+Savings+Preview" alt="College Savings Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>College Savings Calculator</h3><p>Plan and project the savings needed for college education expenses.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'education-loan-emi-calculator': {
            name: 'Education Loan EMI Calculator',
            description: 'Estimates monthly payments for education loans.',
            previewHtml: `<div class="calculator-preview-content"><h4>Education Loan EMI Calculator Preview</h4><p>Estimate education loan payments.</p><img src="https://via.placeholder.com/150x80?text=Edu+Loan+EMI+Preview" alt="Education Loan EMI Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Education Loan EMI Calculator</h3><p>Calculate the Equated Monthly Installment (EMI) for education loans.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        '529-plan-estimator': {
            name: '529 Plan Estimator (US)',
            description: 'Projects the growth and benefits of a 529 college savings plan (US-specific).',
            previewHtml: `<div class="calculator-preview-content"><h4>529 Plan Estimator Preview</h4><p>Project your 529 plan growth (US).</p><img src="https://via.placeholder.com/150x80?text=529+Plan+Preview" alt="529 Plan Estimator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>529 Plan Estimator (US)</h3><p>Project the growth and benefits of a 529 college savings plan.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },

        // Insurance Calculators
        'life-insurance-needs-calculator': {
            name: 'Life Insurance Needs Calculator',
            description: 'Helps determine the adequate amount of life insurance coverage.',
            previewHtml: `<div class="calculator-preview-content"><h4>Life Insurance Needs Preview</h4><p>Assess your life insurance coverage.</p><img src="https://via.placeholder.com/150x80?text=Life+Insurance+Preview" alt="Life Insurance Needs Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Life Insurance Needs Calculator</h3><p>Determine the appropriate amount of life insurance coverage you need.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'health-insurance-premium-estimator': {
            name: 'Health Insurance Premium Estimator',
            description: 'Estimates health insurance premiums based on various factors.',
            previewHtml: `<div class="calculator-preview-content"><h4>Health Insurance Premium Preview</h4><p>Estimate your health insurance costs.</p><img src="https://via.placeholder.com/150x80?text=Health+Premium+Preview" alt="Health Insurance Premium Estimator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Health Insurance Premium Estimator</h3><p>Estimate your health insurance premiums based on factors like age, location, and coverage.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'term-plan-calculator': {
            name: 'Term Plan Calculator',
            description: 'Calculates premiums for term life insurance plans.',
            previewHtml: `<div class="calculator-preview-content"><h4>Term Plan Calculator Preview</h4><p>Calculate term life insurance premiums.</p><img src="https://via.placeholder.com/150x80?text=Term+Plan+Preview" alt="Term Plan Calculator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Term Plan Calculator</h3><p>Calculate the premiums for various term life insurance plans.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        },
        'car-insurance-estimator': {
            name: 'Car Insurance Estimator',
            description: 'Provides an estimate for car insurance premiums.',
            previewHtml: `<div class="calculator-preview-content"><h4>Car Insurance Estimator Preview</h4><p>Estimate your car insurance costs.</p><img src="https://via.placeholder.com/150x80?text=Car+Insurance+Preview" alt="Car Insurance Estimator Preview"></div>`,
            fullHtml: `<div class="placeholder-calculator"><h3>Car Insurance Estimator</h3><p>Get an estimate for your car insurance premiums based on vehicle details and driving history.</p><p><em>(Calculator logic goes here.)</em></p></div>`
        }
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
