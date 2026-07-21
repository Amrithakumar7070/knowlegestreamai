"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, ShieldCheck, CreditCard, Smartphone, Building2, CheckCircle2, Lock, Sparkles } from "lucide-react";
import { CourseData } from "./CourseDetailsModal";

interface RazorpayGatewayModalProps {
  course: CourseData;
  userEmail: string;
  onClose: () => void;
  onSuccess: (paymentId: string) => void;
}

export function RazorpayGatewayModal({
  course,
  userEmail,
  onClose,
  onSuccess,
}: RazorpayGatewayModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [processing, setProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentId, setPaymentId] = useState("");

  const handlePayNow = () => {
    setProcessing(true);

    setTimeout(() => {
      const generatedId = `pay_rzp_${Math.random().toString(36).substring(2, 10)}`;
      setPaymentId(generatedId);
      setProcessing(false);
      setPaymentComplete(true);

      setTimeout(() => {
        onSuccess(generatedId);
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[12000] bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-md bg-[#0D1117] rounded-3xl border border-blue-500/40 overflow-hidden shadow-2xl z-[13000] text-white"
      >
        {/* Razorpay Brand Header Bar */}
        <div className="bg-gradient-to-r from-[#0C2340] via-[#103460] to-[#0284C7] p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-300 hover:text-white p-1 rounded-full bg-black/20"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            <ShieldCheck size={16} className="text-cyan-400" /> Razorpay Trusted Checkout
          </div>
          <h3 className="text-lg font-bold text-white line-clamp-1">{course.title}</h3>
          <div className="text-2xl font-black text-white font-mono mt-2 flex items-baseline gap-1">
            <span>₹{course.price}.00</span>
            <span className="text-xs font-normal text-cyan-200">INR &bull; 90 Days Validity</span>
          </div>
        </div>

        {/* Payment Options Body */}
        {!paymentComplete ? (
          <div className="p-6 space-y-5">
            {/* User Info */}
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center justify-between">
              <span>Billed To: <strong className="text-white">{userEmail}</strong></span>
              <span className="text-emerald-400 font-mono flex items-center gap-1">
                <Lock size={12} /> 256-bit SSL
              </span>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Select Razorpay Payment Method
              </label>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                    paymentMethod === "upi"
                      ? "bg-blue-600/30 border-cyan-400 text-cyan-300 font-bold"
                      : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  <Smartphone size={20} className="text-cyan-400" />
                  <span className="text-xs">UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                    paymentMethod === "card"
                      ? "bg-blue-600/30 border-cyan-400 text-cyan-300 font-bold"
                      : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  <CreditCard size={20} className="text-purple-400" />
                  <span className="text-xs">Cards</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("netbanking")}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                    paymentMethod === "netbanking"
                      ? "bg-blue-600/30 border-cyan-400 text-cyan-300 font-bold"
                      : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  <Building2 size={20} className="text-emerald-400" />
                  <span className="text-xs">Netbanking</span>
                </button>
              </div>
            </div>

            {/* Simulated Input details depending on method */}
            {paymentMethod === "upi" && (
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Pay via GPay, PhonePe, Paytm or BHIM UPI ID</span>
                </div>
                <input
                  type="text"
                  placeholder="enter.your.upi.id@okaxis / gpay"
                  defaultValue={`${userEmail.split("@")[0]}@upi`}
                  className="w-full p-3 rounded-xl bg-[#07090E] border border-white/15 text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            )}

            {paymentMethod === "card" && (
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 text-xs">
                <input
                  type="text"
                  placeholder="Card Number (4312 •••• •••• 9812)"
                  defaultValue="4532 8912 3456 9812"
                  className="w-full p-3 rounded-xl bg-[#07090E] border border-white/15 text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    defaultValue="08/29"
                    className="p-3 rounded-xl bg-[#07090E] border border-white/15 text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    defaultValue="891"
                    className="p-3 rounded-xl bg-[#07090E] border border-white/15 text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>
            )}

            {paymentMethod === "netbanking" && (
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
                <select className="w-full p-3 rounded-xl bg-[#07090E] border border-white/15 text-white focus:outline-none">
                  <option>HDFC Bank Netbanking</option>
                  <option>ICICI Bank Netbanking</option>
                  <option>State Bank of India (SBI)</option>
                  <option>Axis Bank</option>
                  <option>Kotak Mahindra Bank</option>
                </select>
              </div>
            )}

            {/* Pay Button */}
            <button
              onClick={handlePayNow}
              disabled={processing}
              className="w-full py-4 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 glow-btn shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {processing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing Razorpay Payment...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  <span>Pay ₹{course.price} via Razorpay Secure</span>
                </>
              )}
            </button>
          </div>
        ) : (
          /* Payment Success View */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 mx-auto flex items-center justify-center text-emerald-400 animate-bounce">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-xl font-extrabold text-white">Razorpay Payment Successful!</h3>
            <p className="text-xs text-slate-300">
              Payment Verified. Transaction ID: <strong className="text-cyan-400 font-mono">{paymentId}</strong>
            </p>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-bold">
              Course Unlocked in My Courses! Unlocking Sequential Learning Engine...
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
