import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import { NavLink, useNavigate } from "react-router-dom";
import AxiosClient from "../../axios/AxiosClient";
import Loader from "../../components/Loader";
import { confirmAlert } from "react-confirm-alert";

const PaymentDetails = () => {
    const [paymentDetails, setPaymentDetails] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await AxiosClient.get("/api/admin-owner-payment");
            console.log("response data", response.data);
            if (response.data) {
                setLoading(false);
                const sortedpaymentDetails = response.data.sort((a, b) => b.id - a.id);
                setPaymentDetails(sortedpaymentDetails);
                // setPaymentDetails(response.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleClick = (data) => {
        navigate("/view-parking-spot", { state: data });
    };

    const handleEdit = (data) => {
        navigate("/edit-payment-details", { state: data });
    };

    const handleAdd = () => {
        debugger
        navigate("/add-payment-details");
    };

    return (
        <div className="fixed-nav sticky-footer bg-dark" id="page-top">
            <SideBar />
            <div className="content-wrapper">
                <div className="dashboard">
                    <div className="headerTop">{/* <span>Hi Amin </span> */}</div>
                    <div className="contentwrapperInner">
                        <div className="d-flex align-items-center justify-content-between">
                            <h2 className="mr-auto">Owner Payment Details</h2>
                        </div>
                        <div className="row">
                            {!loading ? (
                                <div>
                                    <div>
                                        <div className="text_end">
                                            <button 
                                                onClick={handleAdd}
                                                type="submit"
                                                className="btn btn-primary btn-sm"
                                            >
                                                Add Payment
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : ''}

                        </div>
                        <div className="dashboardList">
                            <div className="row">
                                <div className="col-lg-12 col-xs-12">
                                    {loading ? (
                                        <div className="loader row">
                                            <div
                                                className="col-lg-12 col-xs-12 "
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    height: "500px",
                                                }}
                                            >
                                                <Loader />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="tableListing table-responsive">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: "5%" }}>Sl no</th>
                                                        <th style={{ width: "15%" }}>Owner Name</th>
                                                        {/* <th style={{ width: "10%" }}>Address</th> */}
                                                        {/* <th style={{ width: "15%" }}>Available Time</th> */}
                                                        <th style={{ width: "10%" }}>Owner Email</th>
                                                        <th style={{ width: "10%" }}>Amount Paid</th>
                                                        <th style={{ width: "10%" }}>Paid Date</th>
                                                        {/* <th>Amount(Per Hour)</th> */}
                                                        <th style={{ width: "20%" }}>Remarks</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {paymentDetails.map((ownerPayment, index) => (
                                                        <tr key={ownerPayment.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{ownerPayment.auth_owner.username}</td>
                                                            <td>{ownerPayment.auth_owner.email}</td>
                                                            <td>{ownerPayment.amount_paid}</td>
                                                            <td>{ownerPayment.paid_date}</td>
                                                            <td>{ownerPayment.remarks}</td>
                                                            {/* <td style={{ textWrap: "balance" }}>
                                                                {parkingSpot.google_map}
                                                            </td> */}
                                                            {/* <td>{parkingSpot.available_time}</td>
                                                            <td>{parkingSpot.available_slots}</td> */}

                                                            {/* <td>
                                                                <div style={{ display: "flex" }}>
                                                                    {parkingSpot.photos.map((photo) => (
                                                                        <div key={photo.id}>
                                                                            <img
                                                                                style={{
                                                                                    height: "20px",
                                                                                    width: "25px",
                                                                                }}
                                                                                src={`${import.meta.env.VITE_APP_BASE_URL
                                                                                    }/storage/${photo.photo_path.slice(6)}`}
                                                                                alt="Parking Spot"
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </td> */}
                                                            {/* <td>${parkingSpot.vehicle_fees}</td> */}
                                                            {/* <td>
                                                                {parkingSpot.status ? "Inactive" : "Active"}
                                                            </td> */}

                                                            <td>
                                                                {/* <i
                                                                    className="fa fa-eye"
                                                                    style={{
                                                                        marginRight: "5px",
                                                                        cursor: "pointer",
                                                                    }}
                                                                    onClick={() => handleClick(parkingSpot)}
                                                                ></i> */}

                                                                <i
                                                                    style={{
                                                                        marginRight: "5px",
                                                                        cursor: "pointer",
                                                                    }}
                                                                    className="fa fa-pencil text-success "
                                                                    onClick={() => handleEdit(ownerPayment)}
                                                                ></i>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentDetails;
