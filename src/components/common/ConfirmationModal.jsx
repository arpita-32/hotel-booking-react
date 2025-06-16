import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';

const ConfirmationModal = ({ modalData }) => {
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-6 w-full max-w-[400px] shadow-xl">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-900">{modalData.text1}</h3>
          <p className="text-sm text-gray-500 mt-1">{modalData.text2}</p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              if (modalData.btn2Handler) {
                dispatch(modalData.btn2Handler());
              } else {
                dispatch(modalData.close());
              }
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            {modalData.btn2Text || "Cancel"}
          </button>
          <button
            onClick={() => {
              dispatch(modalData.btn1Handler());
              toast.success(modalData.successMessage || "Operation successful");
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            {modalData.btn1Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;