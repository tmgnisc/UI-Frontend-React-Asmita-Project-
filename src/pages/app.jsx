import React from 'react';
import DateCalendarServerRequest from './DateCalendarServerRequest';

const App = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id; // Use optional chaining to ensure no error is thrown if user is null

  return (
    <div>
      {userId ? (
        <DateCalendarServerRequest userId={userId} />
      ) : (
        <p>User information is not available.</p>
      )}
    </div>
  );
};

export default App;
