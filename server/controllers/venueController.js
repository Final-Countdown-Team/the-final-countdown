import Venue from "../models/venueModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import APIFeatures from "../utils/APIFeatures.js";

export const getAllVenues = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Venue.find({}), req.query)
    .searchName()
    .searchCity()
    .searchDates()
    .sort()
    .limitFields()
    .paginate()
    .getWithinDistance();

  const venues = await features.mongoQuery;

  res.status(200).json({
    status: "success",
    results: venues.length,
    data: venues,
  });
});

export const getVenue = catchAsync(async (req, res, next) => {
  const venue = await Venue.findById(req.params.id);

  if (!venue) throw new AppError("No venue found with that ID", 404);

  res.status(200).json({
    status: "success",
    data: venue,
  });
});

export const createVenue = catchAsync(async (req, res, next) => {
  const venue = await Venue.create(req.body);
  res.status(201).json({
    status: "success",
    data: venue,
  });
});

export const updateVenue = catchAsync(async (req, res, next) => {
  const venue = await Venue.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!venue) throw new AppError("No venue found with that ID", 404);

  res.status(200).json({
    status: "success",
    data: { venue },
  });
});

export const deleteVenue = catchAsync(async (req, res, next) => {
  const venue = await Venue.findByIdAndDelete(req.params.id);
  if (!venue) throw new AppError("No venue found with that ID", 404);
  res.status(204).json({
    status: "success",
    message: "Successfully deleted",
  });
});
