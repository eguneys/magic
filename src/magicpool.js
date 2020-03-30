import Pool from 'poolf';

export default function MagicPool(onCreate) {

  let pool = new Pool(() => {
    let body = onCreate();

    return {
      body
    };
  });


  this.getOrAcquire = (id, onInit) => {
    let res = pool.find(_ => _.id === id);
    if (!res) {
      res = pool.acquire((_) => {
        _.id = id;
        onInit(_.body);
      });
    }

    return res.body;
  };

  this.each = (fn) => pool.each(_ => fn(_.body));
}
