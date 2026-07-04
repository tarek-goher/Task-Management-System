import TasksStatusChart from '../components/Charts/TasksStatusChart'
import TasksByEmployeeChart from '../components/Charts/TasksByEmployeeChart'
import DeadlineChart from '../components/Charts/DeadlineChart'

export default function Dashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-blue-500 mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Tasks by Status</h3>
          <TasksStatusChart />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Tasks by Employee</h3>
          <TasksByEmployeeChart />
        </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 col-span-2">
  <h3 className="text-lg font-semibold text-gray-700 mb-4">Deadlines</h3>
  <DeadlineChart />
</div>

      </div>
    </div>
  )
}