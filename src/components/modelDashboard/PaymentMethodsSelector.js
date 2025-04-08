
export default function PaymentMethodsSelector({onChange, paymentMethods}) {

    const methods = [
        { name: "Visa", icon: "bi-credit-card" },
        { name: "PayPal", icon: "bi-paypal" },
        { name: "Bitcoin", icon: "bi-currency-bitcoin" },
        { name: "Efectivo", icon: "bi-cash" },
    ];

    const toggleMethod = (method) => {
        onChange((prev) =>
            prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]
        );
    };

    return (
        <div className="d-flex justify-content-evenly w-100 gap-4">
            {methods.map((method) => (
                <div key={method.name} className="position-relative">
                    <i className={`fs-1 ${method.icon}`} style={{ color: "var(--special-color)" }}></i>
                    <input
                        type="checkbox"
                        checked={paymentMethods.includes(method.name)}
                        onChange={() => toggleMethod(method.name)}
                        className="position-absolute bottom-0 end-0 form-check-input"
                        style={{ width: "20px", height: "20px" }}
                    />
                </div>
            ))}
        </div>
    );
}
