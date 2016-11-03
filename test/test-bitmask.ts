import * as BitMask from 'bitmask';

export function test(): void {
  describe('BitMask', () => {
    it('should be created', () => {
      var bm = BitMask.create(300);
      expect(bm).toBeDefined();
    });
    it('should set bits', () => {
      var bm = BitMask.create(300);
      expect(() => {
        BitMask.setBit(bm, 0, true);
        BitMask.setBit(bm, 31, true);
        BitMask.setBit(bm, 50, true);
        BitMask.setBit(bm, 90, true);
        BitMask.setBit(bm, 299, true);
      }).not.toThrow();
    });
    it('should get bits', () => {
      var bm = BitMask.create(300);
      BitMask.setBit(bm, 0, true);
      BitMask.setBit(bm, 31, true);
      BitMask.setBit(bm, 90, true);
      BitMask.setBit(bm, 299, true);
      expect(BitMask.getBit(bm, 0)).toBeTruthy();
      expect(BitMask.getBit(bm, 1)).toBeFalsy();
      expect(BitMask.getBit(bm, 30)).toBeFalsy();
      expect(BitMask.getBit(bm, 31)).toBeTruthy();
      expect(BitMask.getBit(bm, 32)).toBeFalsy();
      expect(BitMask.getBit(bm, 90)).toBeTruthy();
      expect(BitMask.getBit(bm, 298)).toBeFalsy();
      expect(BitMask.getBit(bm, 299)).toBeTruthy();
    });
    it('should check if one mask is a superset of the other', () => {
      var superset = BitMask.create(300);
      BitMask.setBit(superset, 0, true);
      BitMask.setBit(superset, 5, true);
      BitMask.setBit(superset, 100, true);
      BitMask.setBit(superset, 150, true);
      BitMask.setBit(superset, 200, true);
      BitMask.setBit(superset, 250, true);

      var bm = BitMask.create(300);
      BitMask.setBit(bm, 0, true);
      BitMask.setBit(bm, 100, true);
      BitMask.setBit(bm, 200, true);
      console.log('Contains ', superset, bm);
      expect(BitMask.contains(superset, bm)).toBeTruthy();
    });
  });
};
