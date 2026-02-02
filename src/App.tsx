import { useState } from 'react'
import { PostList } from './components/PostList'
import { Playground } from './components/Playground'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState<'demo' | 'playground'>('demo')

  return (
    <div className="app">
      <nav className="tabs">
        <button
          className={`tab ${activeTab === 'demo' ? 'active' : ''}`}
          onClick={() => setActiveTab('demo')}
        >
          Demo
        </button>
        <button
          className={`tab ${activeTab === 'playground' ? 'active' : ''}`}
          onClick={() => setActiveTab('playground')}
        >
          Playground
        </button>
      </nav>

      {activeTab === 'demo' ? <PostList /> : <Playground />}
    </div>
  )
}

export default App
