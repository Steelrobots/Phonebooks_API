const chai = require('chai')
const chaiHTTP = require('chai-http');
const fs = require('fs')


chai.should()
chai.use(chaiHTTP)

describe("phonebooks", function(){

    it('should success load phonebooks on /api/phonebooks GET', function(done){
        chai.request(app)
        .get('/api/phonebooks')
        .query({keyword: "andri"})
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.should.be.a('object');
            res.should.have.property('phonebooks');
            res.body.phonebooks.should.be.a('array');
                res.body.phonebooks[0].should.be.a('object');
                res.body.phonebooks[0].should.have.property('id');
                res.body.phonebooks[0].id.should.equal(33);
                res.body.phonebooks[0].should.have.property('name');
                res.body.phonebooks[0].name.should.equal('andri');
                res.body.phonebooks[0].should.have.property('phone');
                res.body.phonebooks[0].phone.should.equal('089695991757');
                res.body.phonebooks[0].should.have.property('avatar');
                res.body.phonebooks[0].should.have.property('createdAt');
                res.body.phonebooks[0].createdAt.should.equal('2024-01-16T04:26:03.486Z');
                res.body.phonebooks[0].should.have.property('updatedAt');
                res.body.phonebooks[0].updatedAt.should.equal('2024-01-26T06:01:15.947Z');
                res.body.should.have.property('page');
                res.body.page.should.be.a('number');
                res.body.page.should.equal(1)
                res.body.should.have.property('limit');
                res.body.limit.should.be.a('number');
                res.body.limit.should.equal(30)
                res.body.should.have.property('pages');
                res.body.pages.should.be.a('number');
                res.body.pages.should.equal(1);
                res.body.should.have.property('total');
                res.body.total.should.be.a('number');
                res.body.total.should.equal(1);
                done()
            });
    });

    it('Should success add phonebooks on /api/phonebooks POST', function (done) {
        chai.request(app)
            .post('/api/phonebooks')
            .send({ name: "lily", phone: "081122134821" })
            .end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('name');
                res.body.name.should.equal('lily');
                res.body.should.have.property('phone');
                res.body.phone.should.equal('081122134821');
                res.body.should.have.property('avatar');
                res.body.should.have.property('createdAt');
                res.body.should.have.property('updatedAt');
                done()
            });
    });

    it('Should filed add phonebooks on /api/phonebooks POST', function (done) {
        chai.request(app)
            .post('/api/phonebooks')
            .send({ name: "", phone: "" })
            .end(function (err, res) {
                res.should.have.status(500)
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('Error');
                res.body.Error.should.equal("name and phone don't be empty");
                done()
            });
    });

    it('Should success update phonebooks on /api/phonebooks PUT', function (done) {
        chai.request(app)
            .put('/api/phonebooks/8')
            .send({name: "lilys" ,phone: "081122134899"})
            .end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('id');
                res.body.id.should.equal(8);
                res.body.should.have.property('name');
                res.body.name.should.equal('lilys');
                res.body.should.have.property('phone');
                res.body.phone.should.equal('081122134899');
                res.body.should.have.property('avatar');
                res.body.should.have.property('createdAt');
                res.body.should.have.property('updatedAt');
                done()
            })
    });

    it('Should filed update phonebooks on /api/phonebooks POST', function (done) {
        chai.request(app)
            .put('/api/phonebooks/59')
            .send({ name: "", phone: "" })
            .end(function (err, res) {
                res.should.have.status(500)
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('Error');
                res.body.Error.should.equal("name and phone don't be empty");
                done()
            });
    });

    it('Should success update avatar phonebooks on /api/phonebooks/:id/avatar PUT', function (done) {
        chai.request(app)
            .put('/api/phonebooks/8/avatar')
            .attach('avatar', fs.readFileSync('./test/coba_profil.JPG'), 'coba_profil.JPG')
            .end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('id');
                res.body.id.should.equal(59);
                res.body.should.have.property('name');
                res.body.name.should.equal('lilys');
                res.body.should.have.property('phone');
                res.body.phone.should.equal('081122134899');
                res.body.should.have.property('avatar');
                res.body.avatar.should.equal(res.body.avatar);
                res.body.should.have.property('createdAt');
                res.body.should.have.property('updatedAt');
                done()
            })
    });

    it('Should filed update empty avatar phonebooks on /api/phonebooks/:id/avatar PUT', function (done) {
            chai.request(app)
                .put('/api/phonebooks/8/avatar')
                .attach('avatar')
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.should.be.json;
                    res.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.error.should.equal('No files were uploaded.');
                    done()
                })
        });

    it('Should success delete phonebooks on /api/phonebooks DELETE', function (done) {
        chai.request(app)
            .delete('/api/phonebooks/8')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.should.be.a('object');
                res.body.should.have.property('id');
                res.body.id.should.equal(59);
                res.body.should.have.property('name');
                res.body.name.should.equal('lilys');
                res.body.should.have.property('phone');
                res.body.phone.should.equal('081122134899');
                res.body.should.have.property('avatar');
                res.body.should.have.property('createdAt');
                res.body.should.have.property('updatedAt');
                done()
            });
    });

    it('Should success delete phonebooks on /api/phonebooks DELETE', function (done) {
            chai.request(app)
                .delete('/api/phonebooks/70')
                .end(function (err, res) {
                    res.should.have.status(500);
                    res.should.be.json;
                    res.should.be.a('object');
                    res.body.should.be.empty;
                    done()
                });
        });

})
