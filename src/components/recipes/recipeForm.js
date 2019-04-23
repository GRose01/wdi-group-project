import React from 'react'
import Select from 'react-select'
import Container from '../container'

const RecipeForm = ({ handleChange, handleSubmit, handleSelect, data, errors, categories, openModal, image }) => {
  return (
    <div className="margin-maker">
      <div className="extra-padding has-background-white margin-topbottom curve-border">
        <h1 className="title is-2">Recipe Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Name (required)</label>
            <div className="control">
              <input
                className={`input ${errors.name ? 'is-danger': ''}`}
                name="name"
                placeholder="Name"
                onChange={handleChange}
                value={data.name || ''}
              />
            </div>
            {errors.name && <small className="help is-danger">{errors.name}</small>}
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <input
                className={`input ${errors.description ? 'is-danger': ''}`}
                name="description"
                placeholder="Description"
                onChange={handleChange}
                value={data.description || ''}
              />
            </div>
            {errors.description && <small className="help is-danger">{errors.description}</small>}
          </div>
          <div className="field">
            <label className="label">Ingredients</label>
            <div className="control">
              <textarea cols='60' rows='4'
                className={`textarea text-top is-rounded ${errors.ingredients ? 'is-danger': ''}`}
                name="ingredients"
                placeholder="Ingredients"
                onChange={handleChange}
                value={data.ingredients || ''}
              />
            </div>
            {errors.ingredients && <small className="help is-danger">{errors.ingredients}</small>}
          </div>
          <div className="field">
            <label className="label">Method</label>
            <div className="control">
              <textarea cols='60' rows='4'
                className={`textarea text-top is-rounded ${errors.method ? 'is-danger': ''}`}
                name="method"
                placeholder="Method"
                onChange={handleChange}
                value={data.method || ''}
              />
            </div>
            {errors.method && <small className="help is-danger">{errors.method}</small>}
          </div>

          {/*<div className="field">
          <label className="label">Food Image</label>
          <Container openModal={openModal} className="button is-info is-rounded" />
          </div>*/}

          <div className="field">
            <label className="label">Recipe Image</label>
            {!image ?
              <Container openModal={openModal} className="button is-warning is-rounded" />
              :
              <img src={image}/>
            }
          </div>

          <div className="field">
            <label className="label">Categories (required)</label>
            <div>
              <Select
                options={categories}
                onChange={handleSelect}
                isMulti
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
          </div>
          <button className="button pin-button is-rounded">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default RecipeForm
