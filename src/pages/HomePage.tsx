import {Fragment, useState, useEffect} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
    CalendarIcon,
    ChartBarIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    Bars3Icon,
    UsersIcon,
    XMarkIcon,
  } from '@heroicons/react/24/outline'
import Axios from 'axios'

  const navigation = [
    { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
    { name: 'Team', href: '#', icon: UsersIcon, current: false },
    { name: 'Projects', href: '#', icon: FolderIcon, current: false },
    { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
    { name: 'Documents', href: '#', icon: InboxIcon, current: false },
    { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
  ]

  const stats = [
    { label: 'Vacation days left', value: 12 },
    { label: 'Sick days left', value: 4 },
    { label: 'Personal days left', value: 2 },
  ]

  const attendance_stats = [
    { name: 'Total Subscribers', stat: '71,897' },
    { name: 'Avg. Open Rate', stat: '58.16%' },
    { name: 'Avg. Click Rate', stat: '24.57%' },
  ]

  const attendanceData = [
    { name: 'Jane Cooper', title: 'Regional Paradigm Technician', role: 'Admin', email: 'jane.cooper@example.com' },
    { name: 'Cody Fisher', title: 'Product Directives Officer', role: 'Owner', email: 'cody.fisher@example.com' },
    // More people...
  ]

  const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}')
  
  function classNames(...classes : Array<String>) {
    return classes.filter(Boolean).join(' ')
  }

type Props = {}

const HomePage = (props: Props) => {

  const [activityDescription, setActivityDescription] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(()=>{
    console.log(activityDescription);
  },[activityDescription])

  const clockIn = ()=>{
    Axios.post('http://localhost:3001/insertAttendance', {
      employeeId: currentUser._id,
      employeeEmail: currentUser.email,
      clockInTime: new Date().toLocaleTimeString() || '0',
      clockOutTime: '-',
      attendDate: new Date().toUTCString() || '0',
      description: activityDescription
    }).then((res)=>{
      console.log(res);
    })
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 flex z-40 md:hidden"
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src="/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                    alt="Workflow"
                  />
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                          'mr-4 h-6 w-6'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
              <div className="flex-shrink-0 flex bg-gray-700 p-4">
                <a href="#" className="flex-shrink-0 group block">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="inline-block h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-base font-medium text-white">{currentUser.fullName}</p>
                      <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">View profile</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col h-0 flex-1 bg-gray-800">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <img
                  className="h-8 w-auto"
                  src="/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                  alt="Workflow"
                />
              </div>
              <nav className="mt-5 flex-1 px-2 bg-gray-800 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                        'mr-3 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex bg-gray-700 p-4">
              <a href="#" className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div>
                    <img
                      className="inline-block h-9 w-9 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">{currentUser.fullName}</p>
                    <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">{currentUser.email}</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Replace with your content */}
              <div className="rounded-lg bg-white overflow-hidden shadow">
                <h2 className="sr-only" id="profile-overview-title">
                  Profile Overview
                </h2>
                <div className="bg-white p-6">
                  <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="sm:flex sm:space-x-5">
                      <div className="flex-shrink-0">
                        <img className="mx-auto h-20 w-20 rounded-full" src={currentUser.imageUrl} alt="" />
                      </div>
                      <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                        <p className="text-sm font-medium text-gray-600">Welcome back,</p>
                        <p className="text-xl font-bold text-gray-900 sm:text-2xl">{currentUser.fullName}</p>
                        <p className="text-sm font-medium text-gray-600">{currentUser.email}</p>
                      </div>
                    </div>
                    <div className="mt-5 flex justify-center sm:mt-0">
                      <a
                        href="#"
                        className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        View profile
                      </a>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                  {stats.map((stat) => (
                    <div key={stat.label} className="px-6 py-5 text-sm font-medium text-center">
                      <span className="text-gray-900">{stat.value}</span> <span className="text-gray-600">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Clock In / Out */}
              <div className="my-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Clock In and Clock Out</h3>
                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                <button
                  type="button"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={clockIn}
                >
                  Clock In
                </button>
                <div className="mt-1 sm:mt-0 sm:col-span-1">
                  <textarea
                    id="activity"
                    name="activity"
                    rows={3}
                    className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                    defaultValue={''}
                    placeholder='Scripting and testing...'
                    onChange={(e)=>{setActivityDescription(e.target.value)}}
                  />
                </div>
                <button
                  type="button"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 shadow text-base font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Clock Out
                </button>
                  {/* {attendance_stats.map((item) => (
                    <div key={item.name} className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.stat}</dd>
                    </div>
                  ))} */}
                </dl>
              </div>
              { /* Attendance Table */ }
              <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Date
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Clock In
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Clock Out
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Activity
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {attendanceData.map((attendance, attendanceIdx) => (
                            <tr key={attendance.email} className={attendanceIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{attendance.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{attendance.title}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{attendance.email}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{attendance.role}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/* /End replace */}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default HomePage