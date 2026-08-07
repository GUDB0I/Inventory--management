import { create } from "../../services/exportservice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { index } from "../../services/prodservice";
import "../../components/stockimport.css";

function CreateExport() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        export_date: "",
    });
    const [detail, setDetail] = useState([
        {
            product_id: "",
            quantity: '',
        }
    ]);
    const [product, setProd] = useState([]);

    const getInfo = async () => {
        try {
            const prodresponse = await index();
            setProd(prodresponse.data.data);
        } catch (err) {
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
            navigate('/stockexport');

        } catch (err) {
            alert(err.response?.data?.message || "Có lỗi xảy ra");
        }
    };
    return (
        <>
            <form className="import-form" onSubmit={handleSubmit}>

                <div className="import-form-group">
                </div>
                <div className="import-form-group">
                    <label>Ngày nhập</label>

                    <input
                        className="import-input"
                        type="date"
                        value={form.export_date}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                export_date: e.target.value
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
                        <button
                            className="remove-btn"
                            type="button"
                            onClick={() => {
                                if (detail.length > 1) {
                                    setDetail(detail.filter((_, i) => i !== index))
                                }
                            }}
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
                    💾 Lưu phiếu xuất
                </button>

            </form>
        </>
    )
}
export default CreateExport;