import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import baseUrl from "../../config.js";

export const HomePage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [newSubscriptionName, setNewSubscriptionName] = useState('');
  const [newSubscriptionCost, setNewSubscriptionCost] = useState('');
  const [newSubscriptionBillingCycle, setNewSubscriptionBillingCycle] = useState('');
  const [newSubscriptionNextPaymentDate, setNewSubscriptionNextPaymentDate] = useState('');
  const [newSubscriptionCategory, setNewSubscriptionCategory] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/subscriptions`, {
          withCredentials: true,
        });

        const subscriptionsData = Array.isArray(res.data) ? res.data : [];
        setSubscriptions(subscriptionsData);

        const cost = subscriptionsData.reduce((total, x) => (total + x.cost || 0), 0);
        setTotalCost(cost);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
        setSubscriptions([]);
      }
    };

    getData();
  }, []);

  const deleteSubscription = async (id) => {
    try {
      await axios.delete(`${baseUrl}/api/subscriptions/${id}`, {
        withCredentials: true,
      });
      setSubscriptions(subscriptions.filter(sub => sub._id !== id));
      const updatedCost = subscriptions.filter(sub => sub._id !== id).reduce((total, x) => (total + x.cost || 0), 0);
      setTotalCost(updatedCost);
    } catch (error) {
      console.error("Error deleting subscription:", error);
    }
  };

  const addSubscription = async (e) => {
    e.preventDefault();
    try {
      const newSubscription = {
        name: newSubscriptionName,
        cost: parseFloat(newSubscriptionCost),
        frequency: newSubscriptionBillingCycle,
        nextPaymentDate: newSubscriptionNextPaymentDate,
        category: newSubscriptionCategory,
      };

      const res = await axios.post(`${baseUrl}/api/subscriptions`, newSubscription, {
        withCredentials: true,
      });

      setSubscriptions([...subscriptions, res.data]);
      setTotalCost(totalCost + res.data.cost);
      setNewSubscriptionName('');
      setNewSubscriptionCost('');
      setNewSubscriptionBillingCycle('');
      setNewSubscriptionNextPaymentDate('');
      setNewSubscriptionCategory('');
    } catch (error) {
      console.error("Error adding subscription:", error);
    }
  };

  return (
    <div className="container">
      <style>
        {`
          body {
            background: linear-gradient(135deg, #667eea, #764ba2);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            color: #fff;
          }

          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            font-family: 'Poppins', sans-serif;
            text-align: center;
            position: relative;
            background: rgba(255, 255, 255, 0.9);
            padding: 30px 40px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            width: 90%;
            animation: slideIn 0.8s ease-out;
          }

          .title {
            font-size: 2rem;
            color: #333;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
            animation: fadeIn 1s ease-in-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .summary {
            background-color: #f4f4f4;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
            font-size: 1.2rem;
          }

          h2{
            color:rgba(0, 0, 0, 0.8);
          }
          .summary span {
            font-weight: bold;
            color: #007bff;
          }

          .subscriptions {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }

          .subscription-card {
            background: white;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            text-align: left;
          }

          .subscription-card h3 {
            margin: 0;
            font-size: 1.4rem;
            color: #222;
          }

          .subscription-card p {
            margin: 5px 0;
            color: #555;
          }

          .subscription-card strong {
            color: #000;
          }

          .delete-btn {
            float: right;
            background-color: #dc3545;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
          }

          .add-form {
            margin-top: 20px;
          }

          .add-form input, .add-form select {
            margin: 5px;
            padding: 5px;
            border-radius: 5px;
            border: 1px solid #ccc;
          }

          .add-form button[type="submit"] {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
          }

          .profile-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: #007bff;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
          }

          @media (max-width: 600px) {
            .container {
              padding: 10px;
            }

            .subscription-card {
              padding: 10px;
            }
          }

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      <button className="profile-btn">
        <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>
          Profile
        </Link>
      </button>

      <h1 className="title">Subscription Tracker</h1>

      <div className="summary">
        <h2>Total Subscriptions Cost: <span>${totalCost.toFixed(2)}</span></h2>
        <button type="button" className="add-btn" onClick={() => {
          document.getElementById('add-form').style.display = 'block';
        }}>Add Subscription</button>
      </div>

      <form id="add-form" className="add-form" style={{display: 'none'}} onSubmit={addSubscription}>
        <input type="text" placeholder="Name" value={newSubscriptionName} onChange={(e) => setNewSubscriptionName(e.target.value)} />
        <input type="number" step="0.01" placeholder="Cost" value={newSubscriptionCost} onChange={(e) => setNewSubscriptionCost(e.target.value)} />
        <select value={newSubscriptionBillingCycle} onChange={(e) => setNewSubscriptionBillingCycle(e.target.value)}>
          <option value="">Select Billing Cycle</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
        <input type="date" placeholder="Next Payment Date" value={newSubscriptionNextPaymentDate} onChange={(e) => setNewSubscriptionNextPaymentDate(e.target.value)} />
        <input type="text" placeholder="Category" value={newSubscriptionCategory} onChange={(e) => setNewSubscriptionCategory(e.target.value)} />
        <button type="submit">Add</button>
        <button type="button" onClick={() => {
          document.getElementById('add-form').style.display = 'none';
        }}>Cancel</button>
      </form>

      <div className="subscriptions">
        {subscriptions.length > 0 ? (
          subscriptions.map((sub) => (
            <div className="subscription-card" key={sub._id}>
              <h3>{sub.name}</h3>
              <p><strong>Price:</strong> ${sub.cost.toFixed(2)} / {sub.billingCycle}</p>
              <p><strong>Next Billing Date:</strong> {new Date(sub.nextPaymentDate).toLocaleDateString()}</p>
              <p><strong>Category:</strong> {sub.category}</p>
              <button className="delete-btn" onClick={() => deleteSubscription(sub._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No subscriptions found.</p>
        )}
      </div>
    </div>
  );
};
