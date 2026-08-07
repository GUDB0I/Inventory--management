import { create } from "../../services/importservice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { index as supp } from "../../services/supplierservice";
import { index as pro } from "../../services/prodservice";
import "../../components/stockimport.css";

function CreateImport() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        supplier_id: "",
        import_date: "",
    });
    const [detail, setDetail] = useState([
        {
            product_id: "",
            quantity: '',
            unit_price: '',
        }
    ]);
    const [supplier, setSuppliers] = useState([]);
    const [product, setProd] = useState([]);

    const getInfo = async () => {
        try {
            const prodresponse = await pro();
            const suppresponse = await supp();
            setProd(prodresponse.data.data);
            setSuppliers(suppresponse.data.data);
        } catch (err) {
            console.log(err.response?.data);
            console.log(err.response?.data);
        }
    }

    useEffect(() => {
        getInfo();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await create({
                ...form,
                products: detail
            });
            alert("Thêm thành công");
            navigate('/stockimport');

        } catch (err) {
            alert(err.response?.data?.message || "Có lỗi xảy ra");
            console.log(err.response?.data);
        }
    };
    return (
        <>
            <form className="import-form" onSubmit={handleSubmit}>

                <div className="import-form-group">
                    <label>Nhà cung cấp</label>

                    <select
                        className="import-input"
                        value={form.supplier_id}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                supplier_id: e.target.value
                            })
                        }
                    >
                        <option value="">-- Chọn nhà cung cấp --</option>

                        {supplier.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="import-form-group">
                    <label>Ngày nhập</label>

                    <input
                        className="import-input"
                        type="date"
                        value={form.import_date}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                import_date: e.target.value
                            })
                        }
                    />
                </div>

                <h3 className="detail-title">Danh sách sản phẩm</h3>

                {detail.map((item, index) => (

                    <div key={index} className="detail-card">

                        <select
                            className="import-input"
                            value={item.product_id}
                            onChange={(e) => {
                                const newDetail = [...detail];
                                newDetail[index].product_id = e.target.value;
                                setDetail(newDetail);
                            }}
                        >
                            <option value="">-- Chọn sản phẩm --</option>

                            {product.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>

                        <input
                            className="import-input"
                            type="number"
                            placeholder="Số lượng"
                            value={item.quantity}
                            onChange={(e) => {
                                const newDetail = [...detail];
                                newDetail[index].quantity = e.target.value;
                                setDetail(newDetail);
                            }}
                        />

                        <input
                            className="import-input"
                            type="number"
                            placeholder="Giá nhập"
                            value={item.unit_price}
                            onChange={(e) => {
                                const newDetail = [...detail];
                                newDetail[index].unit_price = e.target.value;
                                setDetail(newDetail);
                            }}
                        />

                        <button
                            className="remove-btn"
                            type="button"
                            onClick={() =>
                                setDetail(detail.filter((_, i) => i !== index))
                            }
                        >
                            ❌
                        </button>

                    </div>

                ))}

                <button
                    className="add-detail-btn"
                    type="button"
                    onClick={() =>
                        setDetail([
                            ...detail,
                            {
                                product_id: "",
                                quantity: "",
                                unit_price: ""
                            }
                        ])
                    }
                >
                    + Thêm sản phẩm
                </button>

                <button className="submit-btn" type="submit">
                    💾 Lưu phiếu nhập
                </button>

            </form>
        </>
    )
}
export default CreateImport;