

//https://www.raiffeisen.ru/wiki/kak-rasschitat-procenty-po-kreditu/
//https://hamkorbank.uz/credit-calc/

const sumEl = document.querySelector("#sum");
const monthEl = document.querySelector("#month");
const percentEl = document.querySelector("#percent");
const selectEl = document.querySelector("#select");
const submitBtn = document.querySelector(".submit");
const resultTable = document.querySelector(".result__table");

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const sum = sumEl.value;
    const month = monthEl.value;
    const percent = percentEl.value;
    const type = selectEl.value;

    let payments = calc(sum, month, percent, type);

    showPayments(payments);
})

function calc(sum, month, percent, type) {
    let p = percent / 12 / 100;
    let res, payments = [];

    if (type == "1") {
        res = sum * (p + p / ((1 + p) ** month - 1));

        for (let i = 0; i < month; i++) {
            payments.push(+res.toFixed(2));
        }
    }

    else if (type == "2") {
        const b = +(sum / month).toFixed(2);
        let d;

        for (let i = 0; i < month; i++) {
            d = +(sum * p).toFixed(2);
            sum -= b;
            res = +(b + d).toFixed(2);
            payments.push(res);
        }
    }
    return payments;
}

function showPayments(payments) {
    
    document.querySelectorAll(".item").forEach((item, index)=>{
        if (index != 0) item.remove();
    })
    
    const paymentHtml = payments.map((payment, index) => {
        return `
            <div class="item">
                <p class="item_month">${++index}</p>
                <p class="item_payment">${payment}</p>
            </div>`;
    });

    resultTable.insertAdjacentHTML("beforeend", paymentHtml.join(""));

    const paymentsSum = payments.reduce((cur, res) => cur + res, 0);

    const paymentsSumEl = `<div class="item">
                            <p class="item_month">Общая выплата</p>
                            <p class="item_payment">${paymentsSum.toFixed(2)}</p>
                        </div>`;
    resultTable.insertAdjacentHTML("beforeend", paymentsSumEl);
}