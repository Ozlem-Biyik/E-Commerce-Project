import { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">E-Commerce Projesi</h1>
        <Switch>
          <Route exact path="/">
            <div className="text-center">
              <p className="mb-4">E-Commerce projesi başarıyla oluşturuldu!</p>
            </div>
          </Route>
        </Switch>
      </main>
    </div>
  )
}

export default App 