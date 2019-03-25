import React from 'react'
import Select from 'react-select'

const ReviewForm = ({ handleChange, handleSubmit, handleSelect, data, errors, categories }) => {
  return (
    <div className="review-form">
      <h1 className="title is-2">Review Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Restaurant Name (required)</label>
          <div className="control">
            <input
              className={`input is-rounded${errors.restaurantName ? 'is-danger': ''}`}
              name="restaurantName"
              placeholder="Restaurant Name"
              onChange={handleChange}
              value={data.restaurantName || ''}
            />
          </div>
          {errors.restaurantName && <small className="help is-danger">{errors.restaurantName}</small>}
        </div>
        <label className="label">Rating</label>
        <div className="select is-rounded">
          <select onChange={handleChange} name="rating">
            <option>Select Rating</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
        <div className="field">
          <label className="label">Review Headline</label>
          <div className="control">
            <input
              className={`input is-rounded ${errors.reviewHeadline ? 'is-danger': ''}`}
              name="reviewHeadline"
              placeholder="Review Headline"
              onChange={handleChange}
              value={data.reviewHeadline || ''}
            />
          </div>
          {errors.reviewHeadline && <small className="help is-danger">{errors.reviewHeadline}</small>}
        </div>
        <div className="field">
          <label className="label">Review</label>
          <div className="control">
            <input
              className={`input is-rounded${errors.reviewText ? 'is-danger': ''}`}
              name="reviewText"
              placeholder="Review"
              onChange={handleChange}
              value={data.reviewText || ''}
            />
          </div>
          {errors.reviewText && <small className="help is-danger">{errors.reviewText}</small>}
        </div>
        <div className="field">
          <label className="label">Image</label>
          <div className="control">
            <textarea
              className={`input is-rounded ${errors.image ? 'is-danger': ''}`}
              placeholder="Image"
              name="image"
              onChange={handleChange}
              value={data.image || ''}
            />
          </div>
          {errors.image && <small className="help is-danger">{errors.image}</small>}
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
        <button className="button is-info is-rounded">Submit</button>
      </form>
    </div>
  )
}

export default ReviewForm
