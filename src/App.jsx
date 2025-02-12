import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Input, Button } from "@/components/ui/input"; // Ensure you have correct UI components

const App = () => {
  const [activity, setActivity] = useState({ distance: '', hours: '', minutes: '', type: 'walking', date: new Date().toISOString().split('T')[0] });
  const [weight, setWeight] = useState({ weight: '', date: new Date().toISOString().split('T')[0] });
  const [activities, setActivities] = useState([]);
  const [weights, setWeights] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const activitySnapshot = await getDocs(collection(db, "activities"));
      const weightSnapshot = await getDocs(collection(db, "weights"));
      setActivities(activitySnapshot.docs.map(doc => doc.data()));
      setWeights(weightSnapshot.docs.map(doc => doc.data()));
    };
    fetchData();
  }, []);

  const addActivity = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "activities"), activity);
    setActivity({ distance: '', hours: '', minutes: '', type: 'walking', date: new Date().toISOString().split('T')[0] });
  };

  const addWeight = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "weights"), weight);
    setWeight({ weight: '', date: new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="container">
      <h1>Fitness Tracker</h1>

      {/* Activity Form */}
      <form onSubmit={addActivity}>
        <input type="date" value={activity.date} onChange={e => setActivity({ ...activity, date: e.target.value })} />
        <input type="number" placeholder="Distance (km)" value={activity.distance} onChange={e => setActivity({ ...activity, distance: e.target.value })} />
        <input type="number" placeholder="Hours" value={activity.hours} onChange={e => setActivity({ ...activity, hours: e.target.value })} />
        <input type="number" placeholder="Minutes" value={activity.minutes} onChange={e => setActivity({ ...activity, minutes: e.target.value })} />
        <Button type="submit">Save Activity</Button>
      </form>

      {/* Weight Form */}
      <form onSubmit={addWeight}>
        <input type="date" value={weight.date} onChange={e => setWeight({ ...weight, date: e.target.value })} />
        <input type="number" placeholder="Weight (kg)" value={weight.weight} onChange={e => setWeight({ ...weight, weight: e.target.value })} />
        <Button type="submit">Save Weight</Button>
      </form>

      {/* Charts */}
      <div className="chart">
        <h2>Activity Progress</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={activities}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="distance" stroke="#8884d8" name="Distance (km)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart">
        <h2>Weight Progress</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weights}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="weight" stroke="#ff7300" name="Weight (kg)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default App;
