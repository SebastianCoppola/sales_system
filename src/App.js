import './App.css';
import AuthProvider from '../src/auth/AuthProvider';
import AppRoutes from './routes/AppRoutes';

function App() {
	return (

		<AuthProvider>
			<AppRoutes />
		</AuthProvider>
	);
}
export default App;
