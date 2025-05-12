import { useState } from "react";
import { isEnvBrowser } from "./utils/misc";
import { useNuiEvent } from "./hooks/useNuiEvent";
import { fetchNui } from "./utils/fetchNui";
function App() {
  const [visible, setVisible] = useState(isEnvBrowser());

  useNuiEvent("setVisible", (data: { visible?: boolean }) => {
    setVisible(data.visible || false);
  });

  function handleHideModal() {
    setVisible(false);
    void fetchNui("exit");
  }

  return (
    <>
      {visible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Hello, World!
            </h1>
            <p className="text-gray-600 mb-6">
              This is a simple modal with Tailwind CSS styling.
            </p>
            <div className="space-y-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                onClick={() => {
                  void fetchNui("test", { test: "test" });
                }}
              >
                Test NUI
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={handleHideModal}
              >
                Close Modal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
