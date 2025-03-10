import React from 'react';
import WorkoutVolumeChart from './components/graphs/graphs';
import MaxWeightChart from './components/graphs/graphs2';

// Updated stats with previous values and calculated increases
const stats = [
  { name: 'BenchPress PR', value: '40KG', previousValue: '30KG', increase: 10 },
  { name: 'Squat PR', value: '35KG', previousValue: '30KG', increase: 5 },
  { name: 'Deadlift PR', value: '60KG', previousValue: '60KG', increase: 0 },
  { name: 'BodyWeight', value: '69KG', previousValue: '68KG', increase: 1 }
];

function Home() {
  return (
    <>
      <div className="relative isolate overflow-hidden bg-gray-900">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Project Samir
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-gray-300">
              A journey towards fitness. Updated last Monday, 10/03/25.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/log"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Lifting History
              </a>
              <a href="/forum" className="text-sm/6 font-semibold text-white">
                Collaborate <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <svg
          viewBox="0 0 1024 1024"
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
        >
          <circle r={512} cx={512} cy={512} fill="url(#8d958450-c69f-4251-94bc-4e091a323369)" fillOpacity="0.7" />
          <defs>
            <radialGradient id="8d958450-c69f-4251-94bc-4e091a323369">
              <stop stopColor="#7775D6" />
              <stop offset={1} stopColor="#E935C1" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="bg-gray-900 ">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-sm/6 font-medium text-gray-400">{stat.name}</p>
                <p className="mt-2 flex items-baseline gap-x-2">
                  <span className="text-4xl font-semibold tracking-tight text-white">{stat.value}</span>
                  {/* Fixed color logic for weight gain/loss */}
                  <span className={`text-sm font-medium ${
                    stat.name === 'BodyWeight' 
                      ? (stat.increase > 0 ? 'text-green-500' : stat.increase < 0 ? 'text-red-500' : 'text-gray-400')
                      : (stat.increase > 0 ? 'text-green-500' : stat.increase < 0 ? 'text-red-500' : 'text-gray-400')
                  }`}>
                    {stat.increase > 0 && '+'}{stat.increase}KG
                    {stat.increase > 0 ? 
                      ' ↗' : 
                      stat.increase < 0 ? 
                        ' ↘' : 
                        ''
                    }
                  </span>
                </p>
                <p className="text-xs text-gray-500 mt-1">Previous: {stat.previousValue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
      <div className="bg-gray-800 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Philosophy</h2>
            <div className="mt-8 text-lg text-gray-300">
              <p className="mb-4">
                Good gym form changes your posture like adding wd-40 for your joints.
              </p>
              <p>
                Persue your fascinations. Live like you are young. Have a cool life. Go on hikes.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col items-center justify-center space-y-8 py-8">
          <WorkoutVolumeChart />
          <MaxWeightChart />
        </div>
      </div> 


      </div>
    </>
  );
}

export default Home;
