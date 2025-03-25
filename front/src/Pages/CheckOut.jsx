import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getRazorpayId, PurchasesubscriptionCourse, verifyPaymentCourse } from '../Redux/Slices/RazorpaySlice'
import {HomeLayout} from '../LayOut/HomeLayout'
import {BiRupee} from 'react-icons/bi'
export function CheckOut(props) {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const razorpayKey = useSelector((state) => state?.razorpay?.key);
    console.log("key",razorpayKey)
    const subscription_id = useSelector((state) => state?.razorpay?.subscription_id);
    console.log("subscription_id",subscription_id)

    const paymentDetails = {
        payment_id: "",
        subscription_id: "",
        signature: "",
    }

    const handleSubscription=async(e) =>{
        e.preventDefault();
        if(!razorpayKey || !subscription_id) {
            toast.error("something went wrong");
            return;
        }
        const options = {
            key: razorpayKey,
            subscription_id: subscription_id,
            name: "Courses .pvt ltd",
            description: "Subscription",
            theme: {
                color: '#F37254'
            },
            handler: async(response)=> {
                paymentDetails.payment_id = response.payment_id;
                paymentDetails.subscription_id = response.subscription_id;
                paymentDetails.signature = response.signature;
                toast.success("payment successfull");
                
                const res = await dispatch(verifyPaymentCourse(paymentDetails));
                console.log("res on checkout", res, paymentDetails);
                res?.payload ? navigate("/checkout/success") : navigate("/checkout/fail");
            }
        };

        const paymentOptions = new window.Razorpay(options);
        paymentOptions.open();
    }

    const load=async()=> {
        const res1 = await dispatch(getRazorpayId());
        console.log("Razorpay Key Response:", res1);

        const res2 = await dispatch(PurchasesubscriptionCourse());
        console.log("Subscription ID Response:", res2);
    }

    useEffect(() => {
        load();
    }, [])

    return (
        <HomeLayout>
        <form
            onSubmit={handleSubscription}
            className="min-h-[90vh] flex items-center justify-center text-white"
        >
            <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
                <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">
                    Subscription bundle
                </h1>
                <div className="px-4 space-y-5 text-center">
                    <p className="text-[17px]">
                    This purchase will allow you to access all the available courses on our platform for {" "}

                    <span className="font-bold text-yellow-500">1 yr duratrion</span>{" "}
                    All the existing and new launched courses will be available
                    </p>

                    <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                        <BiRupee />
                        <span>499</span> only

                    </p>
                    <div className="text-gray-200">
                        <p>100% refund on cancellation</p>
                        <p>Terms and conditions apply *</p>
                    </div>

                    <button
                        type="submit"
                        className="!bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 !text-xl !font-bold rounded-bl-lg rounded-br-lg !py-2"
                    >
                        buy now
                    </button>

                </div>
            </div>
        </form>
    </HomeLayout>
    )
}
