import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AxiosClient from "../axios/AxiosClient";
import DatePicker from "react-datepicker";
import { formatDate } from "../utils/DateTime";
import Loader from "./Loader";

const EditPaymentDetails = () => {
    const { state } = useLocation();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    const [data, setData] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (state) {
            console.log("state", state);
            setData(state);
            setValue("auth_owner_id", state.auth_owner.id);
            setValue("owner_name", state.auth_owner.username);
            setValue("owner_email", state.auth_owner.email);
            setValue("amount_paid", state.amount_paid);
            setValue("paid_date", state.paid_date);
            setValue("remarks", state.remarks);
            setToDate(new Date(state.paid_date));
        }
    }, [state, setValue]);

    useEffect(() => {
        console.log("Errors", errors);
    }, [errors]);

    const onSubmit = async (formData) => {
        console.log("Edit formdata", formData);
        // Handle form submission logic here
        try {
            setLoading(true);
            const response = await AxiosClient.put(
                `/api/payment-details-edit/${data.id}`,
                formData
            );
            console.log("Updated parking spot:", response.data);
            if (response.status === 200) {
                setLoading(false);

                alert("Payment detail updated successfully!");
                navigate("/payment-details");
            }
        } catch (error) {
            console.error("Error updating parking spot:", error);
            alert("Failed to update parking spot. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    const CustomDatePickerInput = ({ value, onClick }) => {
        console.log("date ", value);
        return (
            <>
                <div className="input-group date picker-date" id="datepicker">
                    <input
                        disabled
                        required
                        type="text"
                        className="form-control style-2 border-right"
                        value={value}
                        onClick={onClick}
                        placeholder="Choose Date"
                    />
                    <span className="input-group-append" onClick={onClick}>
                        <span className="input-group-text bg-white d-block">
                            <i className="fa fa-calendar"></i>
                        </span>
                    </span>
                </div>
            </>
        );
    };

    return (
        <div className="fixed-nav sticky-footer bg-dark" id="page-top">
            <SideBar />
            <div className="content-wrapper">
                <div className="dashboard">
                    <div className="headerTop">{/* <span>Hi Amin </span> */}</div>
                    <div className="contentwrapperInner">
                        <div className="dashboardList">
                            <div className="row tabContentOuter">
                                <div className="col-lg-12 col-md-12 mx-auto">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h3>Edit Parking Slots</h3>
                                        <NavLink to="/payment-details">Back</NavLink>
                                    </div>
                                    <div className="card mb-4 mt-2">
                                        <div className="card-body corporateMenu">
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="row">
                                                    <div className="col-lg-9 col-md-12 mx-auto mt-3">
                                                        <div className="form-group row">
                                                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                                                Owner Name
                                                            </label>
                                                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                                <input
                                                                    disabled
                                                                    type="text"
                                                                    id="owner_name"
                                                                    name="owner_name"
                                                                    className="form-control "
                                                                    {...register("owner_name", {
                                                                        required: true,
                                                                    })}
                                                                />
                                                                {errors?.slot_name && (
                                                                    <span className="text-danger">
                                                                        This field is required
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                                                Owner Email
                                                            </label>
                                                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                                <input
                                                                    disabled
                                                                    type="text"
                                                                    id="owner_email"
                                                                    name="owner_email"
                                                                    className="form-control "
                                                                    {...register("owner_email", {
                                                                        required: true,
                                                                    })}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                                                Amount Paid
                                                            </label>
                                                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                                <input
                                                                    type="text"
                                                                    id="amount_paid"
                                                                    name="amount_paid"
                                                                    className="form-control "
                                                                    {...register("amount_paid", {
                                                                        required: true,
                                                                    })}
                                                                />
                                                                {errors?.available_time && (
                                                                    <span className="text-danger">
                                                                        This field is required
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label
                                                                htmlFor="to_date_time"
                                                                className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12"
                                                            >
                                                                Paid Date
                                                            </label>
                                                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                                <DatePicker
                                                                    selected={toDate} // Pass the selected date here
                                                                    name="paid_date"
                                                                    required
                                                                    customInput={<CustomDatePickerInput />}
                                                                    onChange={(date) => {
                                                                        setToDate(date);
                                                                        setValue("paid_date", formatDate(date));
                                                                    }}
                                                                // {...register("to_date_time", {
                                                                //   required: true,
                                                                // })}
                                                                />
                                                                {errors?.paid_date && (
                                                                    <span className="text-danger">
                                                                        This field is required
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {/* To Date */}

                                                        <div className="form-group row">
                                                            <label className="control-label col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                                                Remarks
                                                            </label>
                                                            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                                <input
                                                                    type="text"
                                                                    id="remarks"
                                                                    name="remarks"
                                                                    className="form-control"
                                                                    {...register("remarks", {
                                                                        required: true,
                                                                    })}
                                                                />
                                                                {errors.remarks && (
                                                                    <span className="text-danger">
                                                                        This field is required
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-9 col-md-12 mx-auto">
                                                        <div className="form-group row">
                                                            <div className="col-md-12 offset-lg-3">
                                                                <button
                                                                    type="submit"
                                                                    className="btn btn-primary btn-sm"
                                                                >
                                                                    {loading ? (
                                                                        <div className="loader">
                                                                            <Loader />
                                                                        </div>
                                                                    ) : (
                                                                        "Edit"
                                                                    )}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPaymentDetails;
