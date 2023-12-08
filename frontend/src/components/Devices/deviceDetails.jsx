import React, { useEffect, useState } from "react";
import {
  getDeviceByIdService,
  getDeviceDataByIdService,
  updateDeviceDataByIdService
} from "../../services/api";
// import AddDevices from "./addDevices";
import { useNavigate, useParams } from "react-router-dom";

const DeviceDetails = () => {
  const [openAddDevice, setIsOpenAddDevice] = useState(false);
  const [deviceToEdit, setDeviceToEdit] = useState(null);
  const [deviceData, setDeviceData] = useState({});
  const [deviceInfo, setDeviceInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const { deviceId } = params;

  console.log(deviceId, "params akash");

  const fetchDeviceById = async (deviceId) => {
    try {
      const deviceData = await getDeviceByIdService(deviceId);
      setDeviceData(deviceData);
      console.log(deviceData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDeviceDataById = async (id) => {
    try {
      const deviceInfo = await getDeviceDataByIdService(deviceId);
      setDeviceInfo(deviceInfo);
      console.log(deviceInfo, "device infor akash");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDeviceById(deviceId);
    fetchDeviceDataById(deviceId);
  }, [deviceId]);

  const handleAddDevice = () => {
    setIsOpenAddDevice(true);
  };
  const handleClose = () => {
    setIsOpenAddDevice(false);
  };
  const accordionData = [
    {
      question: "What is Material Tailwind?",
      answer: "We're not always in the position that we want to be at...",
    },
  ];

  const handleSubmit = async() => {
    console.log("submit akash")
    try {
      console.log("try akash")
      const data = await updateDeviceDataByIdService(deviceId, deviceInfo);
      console.log(data, "info akash")
      setIsModalOpen(false)
    } catch (error) {
      console.error(error);
      console.log("catch akash")
    }
  }

  return (
    <>
      <div className="container mx-auto px-6 py-3">
        <div className="relative mb-3">
          <h6 className="mb-0 flex">
            <button className="relative flex items-center w-full p-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer border-slate-100 text-slate-700 rounded-t-1 group text-dark-500">
              <span>Device - {deviceData?.name}</span>
            </button>
          </h6>

          <div>
            <div className="p-4 text-sm leading-normal text-blue-gray-500/80">
              Manufacturer - {deviceData?.manufacturer}
            </div>
            <div className="px-4 pb-4 text-sm leading-normal text-blue-gray-500/80">
              Purchase Date - {deviceData?.purchase_date}
            </div>
            <div className="px-4 pb-4 text-sm leading-normal text-blue-gray-500/80">
              Serial Number - {deviceData?.serial_number}
            </div>

            <div className="p-4 text-sm leading-normal text-blue-gray-500/80">
              Device location - {deviceInfo?.location}
            </div>
            <div className="px-4 pb-4 text-sm leading-normal text-blue-gray-500/80">
              Device humidity - {deviceInfo?.humidity}
            </div>
            <div className="px-4 pb-4 text-sm leading-normal text-blue-gray-500/80">
              Device temperature - {deviceInfo?.temperature}
            </div>

            <div className="px-4 pb-4 text-sm leading-normal text-blue-gray-500/80">
              Device value - {deviceInfo?.value}
            </div>

            <div className="p-4 text-sm leading-normal text-blue-gray-500/80">
              Device battery level - {deviceInfo?.battery_level}
            </div>
            <div className="px-4 pb-4 text-sm leading-normal text-blue-gray-500/80">
              Device status - {deviceInfo?.status}
            </div>
            <button
              className=""
              // onClick={() => fetchDeviceById(deviceId)}
              // onClick={handleAddDevice}
              onClick={() => setIsModalOpen(true)}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <path d="M12 20h9" />{" "}
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </button>
          </div>
        </div>

        {/* 
       {openAddDevice && (
          <AddDevices closeModal={handleClose}
          //  deviceToEdit={deviceToEdit} 
          deviceToEdit={true}
           />
        )} */}
      </div>
      {isModalOpen && (
        <div
          tabindex="-1"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Edit Device Data
                </h3>
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                  onClick={() => setIsModalOpen(false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                  <div>
                    <label
                      for="device location"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Device Location
                    </label>
                    <input
                      type="text"
                      value={deviceInfo.location}
                      onChange={(event) => setDeviceInfo({...deviceInfo, location:event.target.value})}
                      name="device location"
                      id="device location"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                        block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>
                  <div>
                    <label
                      for="humidity"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Device Humidity
                    </label>
                    <input
                      type="text"
                      value={deviceInfo.humidity}
                      onChange={(event) => setDeviceInfo({...deviceInfo, humidity:event.target.value})}
                      name="humidity"
                      id="humidity"
                      className="bg-gray-50 border border-gray-300 
                        text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                        dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>
                  <div>
                    <label
                      for="temp"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Device Temperature
                    </label>
                    <input
                      type="text"
                      value={deviceInfo.temperature}
                      onChange={(event) => setDeviceInfo({...deviceInfo, temperature:event.target.value})}
                      name="temp"
                      id="temp"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                        block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>
                  <div>
                    <label
                      for="value"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Device Value
                    </label>
                    <input
                      type="text"
                      value={deviceInfo.value}
                      onChange={(event) => setDeviceInfo({...deviceInfo, value:event.target.value})}
                      name="value"
                      id="value"
                      className="bg-gray-50 border border-gray-300 
                        text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                        dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>
                  <div>
                    <label
                      for="level"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Device Battery Level
                    </label>
                    <input
                      type="text"
                      value={deviceInfo.battery_level}
                      onChange={(event) => setDeviceInfo({...deviceInfo, battery_level:event.target.value})}
                      name="level"
                      id="level"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                        block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>
                  <div>
                    <label
                      for="status"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Device Status
                    </label>
                    <input
                      type="text"
                      value={deviceInfo.status}
                      onChange={(event) => setDeviceInfo({...deviceInfo, status:event.target.value})}
                      name="status"
                      id="status"
                      className="bg-gray-50 border border-gray-300 
                        text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                        dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Save
                  </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeviceDetails;
