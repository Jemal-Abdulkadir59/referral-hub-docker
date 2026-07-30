const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const mapRelations = require('./../utils/mapRelations');

exports.createOne = (model, modelName) =>
  catchAsync(async (req, res, next) => {
    const data = mapRelations(modelName, req.body);

    // console.log('BODY:', JSON.stringify(data, null, 2));

    const doc = await model.create({
      data,
    });

    res.status(201).json({
      status: 'success',
      data: { data: doc },
    });
  });

exports.getOne = (model, options = {}) =>
  catchAsync(async (req, res, next) => {
    const { include } = options;

    const doc = await model.findUnique({
      where: { id: req.params.id },
      include, // ✅ THIS is missing
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { data: doc },
    });
  });

exports.deleteOne = (model) =>
  catchAsync(async (req, res, next) => {
    const doc = await model.delete({
      where: { id: req.params.id },
    });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (model) =>
  catchAsync(async (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError('ID is required in URL', 400));
    }

    if (req.body.password) {
      return next(
        new AppError('Use /updateMyPassword for password updates', 400),
      );
    }

    const doc = await model.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.status(200).json({
      status: 'success',
      data: { data: doc },
    });
  });

exports.getAll = (model, options = {}) =>
  catchAsync(async (req, res, next) => {
    const { include } = options;

    // 1️⃣ FILTERING
    const queryObj = { ...req.query };
    const excludedFields = ['sort', 'page', 'limit', 'fields', 'search'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let where = {};

    // basic filtering (exact match)
    Object.keys(queryObj).forEach((key) => {
      where[key] = queryObj[key];
    });

    // 2️⃣ ADVANCED FILTER (gte, lte, etc.)
    if (req.query.price_gte) {
      where.price = { gte: Number(req.query.price_gte) };
    }

    if (req.query.price_lte) {
      where.price = { lte: Number(req.query.price_lte) };
    }

    // 3️⃣ SEARCH (like Mongo regex)
    if (req.query.search) {
      where.name = {
        contains: req.query.search,
        mode: 'insensitive',
      };
    }

    // 4️⃣ SORT
    let orderBy;

    if (req.query.sort) {
      const sortField = req.query.sort.replace('-', '');
      orderBy = {
        [sortField]: req.query.sort.startsWith('-') ? 'desc' : 'asc',
      };
    } else {
      // fallback safely
      orderBy = { id: 'desc' }; // ✅ every model has id
    }

    // 5️⃣ PAGINATION
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 100;
    const skip = (page - 1) * limit;

    // 6️⃣ FIELD SELECTION
    let select = undefined;

    if (req.query.fields) {
      select = {};
      req.query.fields.split(',').forEach((field) => {
        select[field] = true;
      });
    }

    // 7️⃣ FINAL QUERY
    const docs = await model.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      select,
      include, // ✅ THIS is missing
    });

    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: { data: docs },
    });
  });
