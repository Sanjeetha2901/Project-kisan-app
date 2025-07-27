import React, { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const AlertsPage = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "alerts"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setAlerts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">📢 Alerts</h1>
      {alerts.map(alert => (
        <div key={alert.id} className="mb-2 p-3 rounded-lg bg-yellow-100 shadow">
          <h2 className="font-semibold text-green-800">{alert.type}</h2>
          <p>{alert.message}</p>
          <small className="text-gray-500">
            {new Date(alert.createdAt?.seconds * 1000).toLocaleString("ta-IN")}
          </small>
        </div>
      ))}
    </div>
  );
};

export default AlertsPage;
